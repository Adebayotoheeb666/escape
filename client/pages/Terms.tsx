export default function Terms() {
  const sections = [
    {
      id: "accept",
      title: "Acceptance of Terms",
      content:
        "By accessing and using the CryptoVault platform (website, mobile app, and services), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are not authorized to use our services. We reserve the right to modify these terms at any time, and your continued use of CryptoVault constitutes acceptance of changes.",
    },
    {
      id: "eligibility",
      title: "Eligibility",
      content:
        "You must be at least 18 years old or the legal age of majority in your jurisdiction to use CryptoVault. You represent that you are not a resident of a restricted country or on any government sanctions list. You further represent that you are not using CryptoVault for illegal activities, including money laundering, fraud, or sanctions evasion. We reserve the right to deny service to users who violate these eligibility requirements.",
    },
    {
      id: "use",
      title: "Use of Service",
      content:
        "CryptoVault grants you a non-exclusive, non-transferable license to use our platform for personal, non-commercial purposes. You are responsible for maintaining the confidentiality of your login credentials and account information. You agree to: (1) Use the platform only for legal purposes; (2) Not share your account with others; (3) Notify us immediately of unauthorized access; (4) Comply with all applicable laws and regulations; (5) Respect rate limits and API quotas; (6) Not engage in activities that harm the platform or other users.",
    },
    {
      id: "prohibited",
      title: "Prohibited Activities",
      content:
        "You agree not to engage in the following activities: (1) Illegal activities including fraud, money laundering, or sanctions violations; (2) Hacking, unauthorized access, or attempts to compromise platform security; (3) Reverse engineering, decompiling, or attempting to derive the platform's source code; (4) Creating fake accounts or impersonating others; (5) Scraping data without permission; (6) Distributed Denial of Service (DDoS) attacks; (7) Malware distribution or injection; (8) Phishing or social engineering; (9) Market manipulation or insider trading; (10) Harassment, abuse, or threats against other users.",
    },
    {
      id: "fees",
      title: "Fees & Payments",
      content:
        "CryptoVault is free for basic portfolio tracking. Premium features require a paid subscription. Transaction fees and gas costs are borne entirely by you and vary based on blockchain network conditions. We display estimated fees before you confirm any transaction. Payment for premium features is processed through third-party payment providers. We are not responsible for payment processing errors or delays. Refunds for premium subscriptions must be requested within 30 days of purchase.",
    },
    {
      id: "risk",
      title: "Risk Disclosure",
      content:
        "Cryptocurrency is highly volatile and subject to rapid price fluctuations. The value of digital assets can decrease dramatically in short periods. CryptoVault is a tracking and management tool—we do not provide investment advice, financial recommendations, or market forecasts. Past performance does not guarantee future results. You acknowledge the risks of cryptocurrency investing and agree that CryptoVault is not responsible for investment losses. Smart contracts carry execution risks. Always conduct your own research before making financial decisions.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content:
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW: (1) CryptoVault provides the platform 'as is' without warranties of any kind. (2) We are not liable for losses due to blockchain errors, network failures, wallet malfunctions, or smart contract bugs. (3) We are not responsible for user mistakes, including sending funds to wrong addresses or losing private keys. (4) In no event shall CryptoVault be liable for indirect, incidental, special, or consequential damages. (5) Our total liability is limited to the amount you paid CryptoVault in the 12 months prior to your claim. (6) You assume all risks associated with cryptocurrency transactions.",
    },
    {
      id: "ip",
      title: "Intellectual Property",
      content:
        "All content on CryptoVault, including the platform design, logo, branding, and user interface, is protected by copyright, trademark, and other intellectual property laws. You are granted a limited license to view and use the platform for personal purposes only. You may not: (1) Reproduce or distribute any content; (2) Create derivative works; (3) Use our trademarks without permission; (4) Claim ownership of our intellectual property. All rights not explicitly granted are reserved to CryptoVault.",
    },
    {
      id: "termination",
      title: "Termination",
      content:
        "CryptoVault reserves the right to suspend or terminate your account at any time, with or without notice, for violations of these terms or illegal activities. Upon termination: (1) Your account access is immediately revoked; (2) You remain liable for any outstanding fees; (3) We may delete your account data after a reasonable retention period; (4) Blockchain transactions cannot be reversed. We will make reasonable efforts to notify you of account suspension.",
    },
    {
      id: "law",
      title: "Governing Law & Jurisdiction",
      content:
        "These Terms of Service are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles. Any disputes arising from these terms or your use of CryptoVault shall be resolved through binding arbitration rather than court proceedings, except for intellectual property disputes. By using CryptoVault, you consent to arbitration in [Arbitration Location].",
    },
    {
      id: "dispute",
      title: "Dispute Resolution",
      content:
        "If you have a dispute with CryptoVault, please attempt to resolve it informally by contacting us at legal@cryptovault.com. If informal resolution fails, either party may initiate binding arbitration. Arbitration shall be conducted by a neutral third party and is governed by [Arbitration Rules]. Each party bears its own legal fees unless arbitration rules specify otherwise.",
    },
    {
      id: "severability",
      title: "Severability",
      content:
        "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be modified to the minimum extent necessary to make it enforceable, or if not possible, severed from these Terms. The remaining provisions shall continue in full force and effect.",
    },
    {
      id: "contact",
      title: "Contact & Legal",
      content:
        "For legal questions or notices, contact us at legal@cryptovault.com. CryptoVault is operated by [Your Company Name], a [Your Entity Type] registered in [Your Jurisdiction]. By continuing to use CryptoVault after reading these Terms, you acknowledge that you have read, understood, and agree to be bound by all provisions herein.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="font-bold text-gray-900">
            CryptoVault
          </a>
          <nav className="hidden md:flex gap-6 text-gray-600">
            <a href="/privacy" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="/help" className="hover:text-gray-900">
              Help
            </a>
            <a href="/contact" className="hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <aside className="md:sticky md:top-4 h-fit border border-blue-100 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            Table of Contents
          </h3>
          <ul className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <article className="prose max-w-none">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <span className="text-sm text-gray-500">
              Last updated: January 2025
            </span>
          </div>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {s.title}
              </h2>
              <p className="text-gray-700">{s.content}</p>
            </section>
          ))}
          <div className="mt-10">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Agree & Continue
            </a>
          </div>
        </article>
      </main>

      <footer className="bg-gray-50 border-t border-blue-100 py-10">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 CryptoVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
