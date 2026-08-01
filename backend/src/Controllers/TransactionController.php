<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use App\Exceptions\NotFoundException;
use App\Models\Account;
use App\Models\BankToBank;
use App\Models\BankToMobile;
use App\Models\BillPayment;
use App\Models\MoneyTransfer;
use App\Models\Transaction;
use App\Models\UserLog;
use App\Support\Validator;

final class TransactionController
{
    public static function deposit(string $accountNo, float $amount, string $userId): void
    {
        Validator::positiveAmount($amount);

        Database::transaction(function () use ($accountNo, $amount) {
            $account = Account::findByAccountNo($accountNo);

            if (!$account) {
                throw new NotFoundException('Account not found');
            }

            $account->deposit($amount);
            Transaction::create($accountNo, 'DEPOSIT', $amount);
        });

        self::logSafely($userId, $accountNo, $userId, "Deposited {$amount}");
    }

    public static function withdraw(string $accountNo, float $amount, string $userId): void
    {
        Validator::positiveAmount($amount);

        Database::transaction(function () use ($accountNo, $amount) {
            $account = Account::findByAccountNo($accountNo);

            if (!$account) {
                throw new NotFoundException('Account not found');
            }

            $account->withdraw($amount);
            Transaction::create($accountNo, 'WITHDRAW', $amount);
        });

        self::logSafely($userId, $accountNo, $userId, "Withdrawn {$amount}");
    }

    public static function payBill(
        string $paymentId,
        string $accountNo,
        string $billType,
        float $amount,
        string $userId
    ): void {
        Validator::positiveAmount($amount);
        Validator::requireNonEmpty($billType, 'Bill type');

        BillPayment::pay($paymentId, $accountNo, $billType, $amount);

        self::logSafely($userId, $accountNo, $userId, "Paid bill: {$billType}");
    }

    public static function transferInternal(
        string $transferId,
        string $fromAccount,
        string $toAccount,
        float $amount,
        string $userId
    ): void {
        Validator::positiveAmount($amount);

        MoneyTransfer::transfer($transferId, $fromAccount, $toAccount, $amount);

        self::logSafely($userId, $fromAccount, $userId, "Transferred {$amount}");
    }

    public static function transferBank(
        string $transferId,
        string $fromAccount,
        string $receiverBank,
        string $receiverAccount,
        float $amount,
        string $userId
    ): void {
        Validator::positiveAmount($amount);

        // BankToBank::transfer now performs the withdrawal itself,
        // atomically with its own record (see model for why).
        BankToBank::transfer($transferId, $fromAccount, $receiverBank, $receiverAccount, $amount);

        self::logSafely($userId, $fromAccount, $userId, "Bank transfer {$amount}");
    }

    public static function transferMobile(
        string $transferId,
        string $fromAccount,
        string $mobileNumber,
        string $provider,
        float $amount,
        string $userId
    ): void {
        Validator::positiveAmount($amount);
        Validator::mobile($mobileNumber);

        BankToMobile::transfer($transferId, $fromAccount, $mobileNumber, $provider, $amount);

        self::logSafely($userId, $fromAccount, $userId, "Mobile transfer {$amount}");
    }

    public static function getPendingTransactions(): array
    {
        return Transaction::getPendingTransactions();
    }

    public static function approveTransaction(int $transactionId, string $officerId): void
    {
        Transaction::approve($transactionId, $officerId);
    }

    public static function denyTransaction(int $transactionId, string $officerId): void
    {
        Transaction::deny($transactionId, $officerId);
    }

    /**
     * Audit logging is important but is not the reason the customer's
     * money moved. If writing the log entry fails, we record the error
     * server-side rather than throwing — a broken audit log must never
     * make an already-committed deposit/withdrawal/transfer look like it
     * failed to the caller.
     */
    private static function logSafely(string $userId, ?string $accountNo, string $actorId, string $action): void
    {
        try {
            UserLog::log($userId, $accountNo, 'USER', $actorId, $action);
        } catch (\Throwable $e) {
            error_log('UserLog::log failed: ' . $e->getMessage());
        }
    }
}
