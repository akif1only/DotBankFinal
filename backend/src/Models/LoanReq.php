<?php

declare(strict_types=1);

namespace App\Models;

use App\Config\Database;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;

final class LoanReq
{
    public static function create(string $loanId, string $accountNo, float $amount): void
    {
        if ($amount <= 0) {
            throw new ValidationException('Loan amount must be greater than zero.');
        }

        $stmt = Database::getConnection()->prepare(
            "INSERT INTO loan_request (loan_id, account_no, amount, status)
             VALUES (?, ?, ?, 'PENDING')"
        );
        $stmt->execute([$loanId, $accountNo, $amount]);
    }

    public static function approve(string $loanId, string $officerId): void
    {
        Database::transaction(function ($conn) use ($loanId, $officerId) {
            $stmt = $conn->prepare(
                'SELECT * FROM loan_request WHERE loan_id = ? FOR UPDATE'
            );
            $stmt->execute([$loanId]);
            $loan = $stmt->fetch();

            if (!$loan) {
                throw new NotFoundException('Loan not found');
            }

            if ($loan['status'] !== 'PENDING') {
                throw new ValidationException('Loan has already been reviewed.');
            }

            $account = Account::findByAccountNo($loan['account_no']);

            if (!$account) {
                throw new NotFoundException('Account not found');
            }

            $account->deposit((float) $loan['amount']);

            $update = $conn->prepare(
                "UPDATE loan_request SET status = 'APPROVED', reviewed_by = ? WHERE loan_id = ?"
            );
            $update->execute([$officerId, $loanId]);
        });
    }

    public static function deny(string $loanId, string $officerId): void
    {
        $stmt = Database::getConnection()->prepare(
            "UPDATE loan_request SET status = 'DENIED', reviewed_by = ? WHERE loan_id = ?"
        );
        $stmt->execute([$officerId, $loanId]);
    }
}
