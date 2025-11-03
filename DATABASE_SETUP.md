# Database Setup and Verification Guide

## Quick Start

### ✅ Current Status
Your database is **fully configured and production-ready**.

- ✅ All 10 tables deployed
- ✅ All 8 functions available  
- ✅ RLS security policies active
- ✅ Authentication configured
- ✅ Environment variables set

### 🧪 Verify Connection

```bash
# Quick verification
npm run test:db

# Detailed diagnostics
npx tsx server/diagnose-db-connection.ts
```

---

## 📋 Environment Variables

Your Supabase credentials are configured:

| Variable | Purpose | Status |
|----------|---------|--------|
| `VITE_SUPABASE_URL` | Database endpoint | ✅ Set |
| `VITE_SUPABASE_ANON_KEY` | Frontend access | ✅ Set |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend access | ✅ Set |

**Note**: These are automatically loaded from your environment and do not need manual configuration.

---

## 🗄️ Database Schema

### Tables
```
users               → User profiles and KYC data
sessions            → Session management
wallets             → Connected wallets (MetaMask, Coinbase, Ledger, Trezor)
assets              → Cryptocurrency holdings
transactions        → Transaction history
price_history       → Historical price data
withdrawal_requests → Withdrawal management
portfolio_snapshots → Portfolio snapshots for history
price_alerts        → User price alerts
audit_logs          → Audit trail of all changes
```

### Functions
```
calculate_portfolio_value()      → Get total portfolio value
get_portfolio_24h_change()       → Get 24h change % and $
get_portfolio_allocation()       → Asset allocation breakdown
get_transaction_summary()        → Summary by transaction type
update_asset_prices()            → Update prices from external API
check_and_trigger_price_alerts() → Check and trigger alerts
cleanup_expired_sessions()       → Remove expired sessions
log_audit_event()                → Record audit events
```

---

## 🔌 Using the Database

### In Frontend Components

```typescript
import { supabase } from "@shared/lib/supabase";
import { getPortfolioValue, getUserWallets } from "@shared/lib/supabase";

export function Dashboard({ userId }: { userId: string }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const wallets = await getUserWallets(userId);
      setAssets(wallets);
      setLoading(false);
    }
    load();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{/* render assets */}</div>;
}
```

### In Server Routes

```typescript
// server/routes/portfolio.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@shared/types/database";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function getPortfolio(req, res) {
  const userId = req.params.userId;
  
  const { data, error } = await supabase
    .from("assets")
    .select("*")
    .eq("user_id", userId);
  
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
}
```

### Available Helper Functions

```typescript
// Portfolio
getPortfolioValue(userId)
getPortfolio24hChange(userId)
getPortfolioAllocation(userId)
getPortfolioSnapshots(userId, daysBack)
createPortfolioSnapshot(userId, totalValueUsd, totalValueBtc, ...)

// Transactions
getTransactionHistory(userId, limit, offset)
getTransactionSummary(userId, days)
getTransactionByHash(txHash)

// Wallets
getUserWallets(userId)
getPrimaryWallet(userId)
createWallet(userId, walletAddress, walletType, label)
disconnectWallet(walletId)

// Assets
getUserAssets(userId)
getWalletAssets(walletId)
updateAssetBalance(assetId, balance, priceUsd)

// Withdrawals
createWithdrawalRequest(userId, walletId, symbol, amount, ...)
getWithdrawalRequests(userId)
updateWithdrawalStatus(withdrawalId, status, txHash)

// Prices
getPriceHistory(symbol, daysBack, limit)
getLatestPrice(symbol)
insertPriceHistory(symbol, priceUsd, priceChange24h, ...)

// Price Alerts
createPriceAlert(userId, symbol, alertType, targetPrice)
getUserPriceAlerts(userId, activeOnly)
deletePriceAlert(alertId)

// Audit
getAuditLogs(userId, limit)
logAuditEvent(userId, action, entityType, entityId, ...)

// Users
getUserProfile(userId)
updateUserProfile(userId, updates)
createUserProfile(userId, email, authId)

// Maintenance
updateAssetPrices()
checkAndTriggerPriceAlerts()
cleanupExpiredSessions()
```

---

## 🔐 Security Features

### Row Level Security (RLS)
- ✅ Users can only see their own data
- ✅ Wallets filtered by user_id
- ✅ Transactions filtered by user_id
- ✅ All sensitive operations protected

### Authentication
- ✅ Email/password authentication
- ✅ JWT token management
- ✅ Session expiration (30 days)
- ✅ 2FA support for sensitive operations

### Audit Logging
- ✅ All wallet connections logged
- ✅ All transactions recorded
- ✅ All withdrawals tracked
- ✅ IP address and user agent recorded

### API Keys
- **Anon Key** (frontend): Respects RLS policies
- **Service Role Key** (backend only): Full access, never expose to frontend

---

## 🚀 Deployment

### Prerequisites
- Environment variables set in hosting platform
- Database schema deployed to Supabase
- All functions created in PostgreSQL

### On Netlify
1. [Connect to Netlify](#open-mcp-popover)
2. Configure environment variables in Netlify dashboard
3. Deploy! The app will work immediately

### On Vercel
1. [Connect to Vercel](#open-mcp-popover)
2. Configure environment variables in Vercel dashboard
3. Deploy! The app will work immediately

### Environment Variables to Set
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

---

## 🔍 Troubleshooting

### Connection Fails with "relation does not exist"
**Problem**: Table not found  
**Solution**: Re-run schema deployment in Supabase SQL editor

### "Permission denied" Error
**Problem**: RLS policy blocking access  
**Solution**: Ensure user is logged in and `auth.uid()` matches `user_id` in table

### "Auth session missing" Error
**Problem**: No authenticated user  
**Solution**: Log in first, or use service role key on backend

### Queries Return Null
**Problem**: No data in database  
**Solution**: 
1. Check filters are correct
2. Seed test data in Supabase dashboard
3. Check user_id matches authenticated user

### Functions Not Found
**Problem**: PostgreSQL function missing  
**Solution**: Re-run schema.sql in Supabase SQL editor

---

## 📊 Monitoring

### Check Database Health
1. Visit https://app.supabase.com
2. Select your project: `rdrmehocsdmadhostbgz`
3. Navigate to **Database** → **Tables**
4. Verify all 10 tables exist

### Check Functions
1. In Supabase dashboard
2. Navigate to **Database** → **Functions**
3. Verify all 8 functions exist

### Check Logs
1. For database errors: **Logs** tab in Supabase
2. For auth errors: **Authentication** → **Logs**
3. For API errors: Check browser console

### Check Usage
1. In Supabase dashboard: **Projects** → **Usage**
2. Monitor API calls, storage, and bandwidth
3. Upgrade plan if needed

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Supabase Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🎯 Next Steps

1. **Start using the database** in your components
2. **Add more features** using the helper functions
3. **Deploy to production** using Netlify or Vercel
4. **Monitor performance** using Supabase dashboard

---

## ✅ Verification Checklist

- [x] Environment variables configured
- [x] Supabase client works
- [x] All tables exist
- [x] All functions available
- [x] RLS policies active
- [x] Authentication works
- [x] Helper functions implemented
- [x] TypeScript types available

**Status**: 🟢 **READY TO USE**

---

For more details, see [DB_CONNECTION_REPORT.md](./DB_CONNECTION_REPORT.md)
