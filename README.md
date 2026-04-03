# 🔴 SCARLET HAUL — Setup Guide
## Get your store live in under 30 minutes, completely free

---

## STEP 1 — Set up Supabase (database + logins) [FREE]

1. Go to **supabase.com** → Sign up with GitHub or Google
2. Click **"New Project"** → name it `scarlet-haul` → set a database password → click Create
3. Wait ~1 minute for it to set up
4. Go to **SQL Editor** (left sidebar) → paste the entire contents of `SUPABASE_SETUP.sql` → click **Run**
5. Go to **Project Settings → API**
   - Copy your **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - Copy your **anon public** key (a long string starting with `eyJ...`)
6. Open `lib/supabase.js` and replace:
   - `YOUR_SUPABASE_URL` → your Project URL
   - `YOUR_SUPABASE_ANON_KEY` → your anon key

---

## STEP 2 — Set your Cash App tag

You need to put your Cash App $cashtag in two places:

1. Open `index.html` and find `$YOUR_CASHTAG` — replace with your actual tag (e.g. `$JohnDoe`)
   - There are 2 places in the checkout section — replace both
2. Open `admin.html` → go to Settings tab → enter your Cash App tag there too

**How Cash App payments work:**
- Customer places order → they get your Cash App tag + their Order ID
- They send you the money on Cash App with the Order ID in the note
- You open Admin → see the order → confirm the payment → change status to "Confirmed"
- Then you order the product from your supplier (AliExpress/DSers) and ship to their address

---

## STEP 3 — Set up email confirmation (order emails) [FREE]

1. Go to **resend.com** → Sign up free (3,000 emails/month free)
2. Go to **API Keys** → Create API key → copy it
3. Go to your Supabase project → **Edge Functions**
4. Create a new function called `send-order-email`
5. Paste this code into it:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { email, name, orderId, total, items } = await req.json()
  
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_RESEND_API_KEY`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Scarlet Haul <orders@yourdomain.com>',
      to: email,
      subject: `Order Confirmed — ${orderId}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <div style="background:#080808;padding:24px;text-align:center">
            <h1 style="color:#ff2e2e;font-size:28px;letter-spacing:3px;margin:0">SCARLET HAUL</h1>
          </div>
          <div style="padding:32px;background:#111;color:#f0f0f0">
            <h2 style="margin-top:0">Thanks, ${name}!</h2>
            <p style="color:#888">Your order has been placed. Your Order ID is:</p>
            <div style="background:#1a1a1a;border:1px solid #333;padding:16px;border-radius:8px;text-align:center;margin:20px 0">
              <span style="font-family:monospace;color:#ff2e2e;font-size:22px;letter-spacing:2px">${orderId}</span>
            </div>
            <p style="color:#f0f0f0">Order total: <strong style="color:#ff2e2e">$${total}</strong></p>
            <div style="background:#cc1c1c22;border:1px solid #cc1c1c44;padding:16px;border-radius:8px;margin:20px 0">
              <p style="color:#ff2e2e;margin:0 0 8px;font-weight:bold">Next step: Send your payment</p>
              <p style="color:#ccc;margin:0;font-size:14px">
                Send <strong>$${total}</strong> to <strong style="color:#ff2e2e">$YOUR_CASHTAG</strong> on Cash App.<br>
                Include your Order ID <strong>${orderId}</strong> in the payment note.
              </p>
            </div>
            <p style="color:#888;font-size:13px">Once we confirm your payment, your order will ship within 24–48 hours.</p>
          </div>
          <div style="padding:16px;text-align:center;color:#555;font-size:12px">
            © 2025 Scarlet Haul. All rights reserved.
          </div>
        </div>
      `
    })
  })
  
  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
})
```

6. Replace `YOUR_RESEND_API_KEY` with your Resend key
7. Deploy the function

---

## STEP 4 — Deploy to Vercel (hosting) [FREE, 24/7]

1. Go to **vercel.com** → Sign up with GitHub
2. Install the Vercel CLI (optional) or use the web UI
3. **Easiest method (drag & drop):**
   - Go to vercel.com/new
   - Drag your entire `scarlethaul` folder onto the page
   - Click Deploy
   - In ~30 seconds you'll get a live link like `scarlet-haul.vercel.app`

That's your store — live, 24/7, free forever.

---

## STEP 5 — Get a custom domain [~$10/year]

1. Go to **namecheap.com** and search for:
   - `scarlethaul.com` ← try this first
   - `scarlethaul.shop` ← great for stores, sometimes cheaper
   - `thescarlethaul.com`
   - `scarlethaul.co`
2. Buy the one you want (usually $10–12/year)
3. In Vercel → your project → Settings → Domains → Add domain
4. Follow Vercel's instructions to point your Namecheap domain to Vercel
   (takes about 10 minutes to go live)

---

## STEP 6 — Admin panel

- Go to `yoursite.com/admin.html`
- Default password: `scarlethaul2025`
- **Change this immediately** in Settings tab
- Add products, manage orders, update order statuses

---

## HOW ORDERS WORK (the dropshipping flow)

1. Customer browses your store and adds items to cart
2. Customer fills in shipping info + their Cash App username
3. Order is saved to database with status **"Pending Payment"**
4. Customer gets a confirmation email with your Cash App tag + their Order ID
5. Customer sends you money on Cash App with Order ID in the note
6. You check Cash App → see the payment → go to Admin panel
7. Change order status to **"Confirmed"**
8. Go to your supplier (e.g. AliExpress) → buy the product → ship to customer's address
9. Change order status to **"Shipped"** then **"Delivered"**

**To automate step 8:** Sign up for DSers (dsers.com, free) and connect your AliExpress account.

---

## FREE SERVICES SUMMARY

| Service | What it does | Free limit |
|---|---|---|
| Supabase | Database + user accounts | 50,000 rows, 50MB |
| Vercel | Hosting | Unlimited |
| Resend | Emails | 3,000/month |
| Namecheap | Domain | ~$10/year (not free) |
| Cash App | Payments | Free to receive |
| DSers | Auto-fulfill orders | Free plan |

---

## NEED HELP?

Common issues:
- **"Cannot read properties of undefined"** → Check your Supabase URL and key in `lib/supabase.js`
- **Orders not saving** → Run the SQL from `SUPABASE_SETUP.sql` in Supabase SQL Editor
- **Emails not sending** → Check your Resend API key in the Edge Function

Good luck with Scarlet Haul! 🔴
