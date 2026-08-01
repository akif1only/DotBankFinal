<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\AccountRequest;
use App\Models\LoanReq;
use App\Models\OfficerLog;
use App\Models\Transaction;

final class OfficerController
{
    public static function approveAccount(string $requestId, string $officerId, string $officerName): void
    {
        AccountRequest::approve($requestId, $officerId);
        OfficerLog::log($officerId, $officerName, 'Approved account request');
    }

    public static function denyAccount(string $requestId, string $officerId, string $officerName): void
    {
        AccountRequest::deny($requestId);
        OfficerLog::log($officerId, $officerName, 'Denied account request');
    }

    public static function approveLoan(string $loanId, string $officerId, string $officerName): void
    {
        LoanReq::approve($loanId, $officerId);
        OfficerLog::log($officerId, $officerName, 'Approved loan');
    }

    public static function denyLoan(string $loanId, string $officerId, string $officerName): void
    {
        LoanReq::deny($loanId, $officerId);
        OfficerLog::log($officerId, $officerName, 'Denied loan');
    }

    public static function approveTransaction(int $transactionId, string $officerId): void
    {
        Transaction::approve($transactionId, $officerId);
    }
}
