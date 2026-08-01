<?php

declare(strict_types=1);

namespace App\Models;

use App\Config\Database;
use App\Exceptions\InsufficientFundsException;
use App\Exceptions\ValidationException;

final class Account
{
    public function __construct(
        public readonly string $accountNo,
        public readonly string $userId,
        public float $balance,
        public readonly string $accountType,
        public string $status,
        public ?string $handledBy
    ) {
    }

    public static function generateAccountNo(): string
    {
        return 'ACC' . date('YmdHis') . random_int(100, 999);
    }

    public static function findByAccountNo(string $accountNo): ?self
    {
        $stmt = Database::getConnection()->prepare(
            'SELECT * FROM account WHERE account_no = ?'
        );
        $stmt->execute([$accountNo]);
        $row = $stmt->fetch();

        if (!$row) {
            return null;
        }

        return new self(
            $row['account_no'],
            $row['user_id'],
            (float) $row['balance'],
            $row['account_type'],
            $row['status'],
            $row['handled_by']
        );
    }

    public function deposit(float $amount): void
    {
        if ($amount <= 0) {
            throw new ValidationException('Invalid amount');
        }

        $stmt = Database::getConnection()->prepare(
            'UPDATE account SET balance = balance + ? WHERE account_no = ?'
        );
        $stmt->execute([$amount, $this->accountNo]);

        $this->balance += $amount;
    }

    /**
     * Withdraws atomically at the database level: the balance check and
     * the decrement happen in a single conditional UPDATE, so two
     * concurrent withdrawals against the same account can't both pass a
     * stale in-PHP balance check and overdraw the account (a classic
     * check-then-act race condition).
     */
    public function withdraw(float $amount): void
    {
        if ($amount <= 0) {
            throw new ValidationException('Invalid amount');
        }

        $stmt = Database::getConnection()->prepare(
            'UPDATE account
             SET balance = balance - ?
             WHERE account_no = ? AND balance >= ?'
        );
        $stmt->execute([$amount, $this->accountNo, $amount]);

        if ($stmt->rowCount() === 0) {
            // Either insufficient balance, or the account no longer exists.
            throw new InsufficientFundsException('Insufficient balance');
        }

        $this->balance -= $amount;
    }

    public function block(): void
    {
        $stmt = Database::getConnection()->prepare(
            "UPDATE account SET status = 'BLOCKED' WHERE account_no = ?"
        );
        $stmt->execute([$this->accountNo]);
        $this->status = 'BLOCKED';
    }

    public function activate(): void
    {
        $stmt = Database::getConnection()->prepare(
            "UPDATE account SET status = 'ACTIVE' WHERE account_no = ?"
        );
        $stmt->execute([$this->accountNo]);
        $this->status = 'ACTIVE';
    }
}
