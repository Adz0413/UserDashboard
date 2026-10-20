import { useState, type ReactNode } from "react"

type IconName = "alert" | "bell" | "chevron" | "document" | "home" | "location" | "phone" | "shield" | "user"

type PageName = "Profile" | "Settings" | "Contacts" | "About" | "Information" | "Terms"

function Icon({ name, className = "" }: { name: IconName className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    alert: (
      <>
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
        <path d="M10.3 3.8 2.5 17.3A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.7L13.7 3.8a2 2 0 0 0-3.4 0Z" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    ),
    shield: (
      <>
        <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 22a8 8 0 0 1 16 0" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  )
}

function AppButton({
  children,
  className = "",
  onClick,
  label,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  label?: string
}) {
  return (
    <button
      aria-label={label}
      className={className}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

const contactNumbers = [
  ["National emergency", "911"],
  ["Philippine National Police", "117 · (02) 722-0650"],
  ["Bureau of Fire Protection", "(02) 426-0219 · (02) 426-0246"],
  ["NDRRMC", "(02) 8911-1406 · (02) 8912-2665"],
  ["Philippine Red Cross", "143 · (02) 8527-8385"],
  ["Mental health crisis support", "1800-1888-1553"],
]

function SettingRow({
  label,
  description,
  initial,
}: {
  label: string
  description: string
  initial: boolean
}) {
  const [enabled, setEnabled] = useState(initial)

  return (
    <AppButton
      className="menu-row"
      onClick={() => setEnabled((value) => !value)}
    >
      <span className="menu-row-icon">
        <Icon className="size-5" name="shield" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="label block">{label}</span>
        <span className="caption mt-1 block">{description}</span>
      </span>
      <span className={enabled ? "toggle toggle-on" : "toggle"}>
        <span />
      </span>
    </AppButton>
  )
}

function DetailPage({
  page,
  onBack,
  onOpen,
}: {
  page: PageName
  onBack: () => void
  onOpen: (page: PageName) => void
}) {
  return (
    <div className="page-overlay">
      <div className="page-shell">
        <div className="page-topbar">
          <AppButton className="back-button" label="Go back" onClick={onBack}>
            <Icon className="size-5 rotate-180" name="chevron" />
          </AppButton>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">ResQLink</p>
            <p className="page-title">{page === "Profile" ? "More" : page}</p>
          </div>
        </div>

        {page === "Profile" && (
          <div className="page-content">
            <div className="profile-card">
              <img
                alt="Jesica Smith"
                className="size-16 rounded-2xl object-cover"
                src="/assets/jesica-smith.png"
              />
              <div>
                <p className="section-title">Jesica Smith</p>
                <p className="caption mt-1">
                  User ID: 0200342900 · Pembo, Taguig
                </p>
              </div>
            </div>
            <div className="menu-list">
              {[
                ["Information", "Medical ID, address and emergency details"],
                ["Settings", "Notifications, location and privacy"],
                ["Contacts", "National emergency contact numbers"],
                ["About", "How ResQLink finds and shares your location"],
                ["Terms", "Terms, privacy and responsibilities"],
              ].map(([label, description]) => (
                <AppButton
                  className="menu-row"
                  key={label}
                  onClick={() => onOpen(label as PageName)}
                >
                  <span className="menu-row-icon">
                    <Icon
                      className="size-5"
                      name={
                        label === "Contacts"
                          ? "phone"
                          : label === "Information"
                            ? "user"
                            : label === "Settings"
                              ? "shield"
                              : "document"
                      }
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="label block">{label}</span>
                    <span className="caption mt-1 block">{description}</span>
                  </span>
                  <Icon className="size-4 text-muted" name="chevron" />
                </AppButton>
              ))}
            </div>
          </div>
        )}

        {page === "Information" && (
          <div className="page-content">
            <div className="profile-hero">
              <img
                alt="Jesica Smith"
                className="size-20 rounded-3xl object-cover"
                src="/assets/jesica-smith.png"
              />
              <p className="mt-3 font-heading text-lg">Jesica Smith</p>
              <p className="caption mt-1">Pembo, Taguig City</p>
            </div>
            <div className="info-grid">
              {[
                ["Contact number", "0929 706 0502"],
                ["Blood type", "O+"],
                [
                  "Complete address",
                  "Blk 4 Lot 2, Sampaguita St., Barangay Rizal, Taguig City",
                ],
                ["Occupation", "N/A"],
                ["Allergies", "Seafood"],
              ].map(([label, value]) => (
                <div className="info-card" key={label}>
                  <p className="caption">{label}</p>
                  <p className="label mt-1.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "Settings" && (
          <div className="page-content">
            <div className="settings-intro">
              <p className="section-title text-white">Safety preferences</p>
              <p className="emergency-copy mt-1">
                Keep essential services enabled so responders can reach you
                quickly.
              </p>
            </div>
            <div className="menu-list">
              {[
                ["Notifications", "Allow emergency alerts", true],
                [
                  "Location sharing",
                  "Share your live location during requests",
                  true,
                ],
                [
                  "Data sharing",
                  "Share emergency information with responders",
                  true,
                ],
                ["Privacy mode", "Limit background location access", false],
                [
                  "Alert sound & vibration",
                  "Use loud alerts for critical updates",
                  true,
                ],
              ].map(([label, description, initial]) => (
                <SettingRow
                  description={description as string}
                  initial={initial as boolean}
                  key={label as string}
                  label={label as string}
                />
              ))}
            </div>
          </div>
        )}

        {page === "Contacts" && (
          <div className="page-content">
            <div className="callout">
              <span className="callout-icon">
                <Icon className="size-5" name="phone" />
              </span>
              <div>
                <p className="label">Immediate danger?</p>
                <p className="caption mt-1">
                  Call 911 for police, fire, or medical assistance.
                </p>
              </div>
            </div>
            <div className="menu-list">
              {contactNumbers.map(([agency, number]) => (
                <a
                  className="contact-row"
                  href={`tel:${number.split("·")[0].trim()}`}
                  key={agency}
                >
                  <span>
                    <span className="label block">{agency}</span>
                    <span className="caption mt-1 block">{number}</span>
                  </span>
                  <span className="call-button">
                    <Icon className="size-4" name="phone" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {page === "About" && (
          <div className="page-content">
            <div className="about-mark">
              <Icon className="size-7" name="location" />
            </div>
            <p className="font-heading text-2xl tracking-tight">ResQLink</p>
            <p className="body-copy mt-4">
              ResQLink combines GPS, nearby Wi-Fi access points, cellular
              signals, and data connections to find your position faster and
              more accurately. This helps responders locate you even when GPS is
              weak indoors or between tall buildings.
            </p>
            <div className="content-card mt-5">
              <p className="section-title">Location permission</p>
              <p className="body-copy mt-2">
                ResQLink needs location access to share your position with
                responders during an emergency. Location is shared only while a
                help request is active.
              </p>
            </div>
            <AppButton
              className="primary-action mt-5"
              onClick={() => onOpen("Terms")}
            >
              Read terms and agreement
            </AppButton>
          </div>
        )}

        {page === "Terms" && (
          <div className="page-content">
            <div className="terms-card">
              {[
                [
                  "1. Acceptance of terms",
                  "By using ResQLink, you agree to these terms of service.",
                ],
                [
                  "2. Purpose of the application",
                  "The app sends SOS alerts, shares location data with authorized responders, and supports coordinated rescue operations.",
                ],
                [
                  "3. User responsibilities",
                  "Provide accurate information, use the app only for legitimate emergencies, and keep your login credentials confidential.",
                ],
                [
                  "4. Location data",
                  "Your location is shared only during active emergency alerts and is encrypted during transmission.",
                ],
                [
                  "5. Data privacy",
                  "Personal and emergency information is used only for rescue and response purposes, except where disclosure is required by law.",
                ],
                [
                  "6. Intellectual property",
                  "App content and code may not be reproduced or distributed without permission.",
                ],
                [
                  "7. Changes to terms",
                  "Updated terms will be posted in the app. Continued use after an update indicates acceptance.",
                ],
              ].map(([title, copy]) => (
                <div className="term-section" key={title}>
                  <p className="font-heading text-sm">{title}</p>
                  <p className="body-copy mt-1">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState("Home")
  const [activePage, setActivePage] = useState<PageName | null>(null)
  const [alertSent, setAlertSent] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)

  const navItems: { label: string icon: IconName }[] = [
    { label: "Home", icon: "home" },
    { label: "My requests", icon: "document" },
    { label: "Location", icon: "location" },
    { label: "Profile", icon: "user" },
  ]

  return (
    <main className="min-h-dvh bg-canvas text-ink">
      <div className="mx-auto min-h-dvh w-full max-w-app bg-canvas pb-nav">
        <header className="flex items-center justify-between px-page pb-section pt-top">
          <div>
            <p className="eyebrow">ResQLink member</p>
            <p className="heading mt-1">Hi, Jesica</p>
          </div>
          <div className="flex items-center gap-3">
            <AppButton className="icon-button relative" label="Notifications">
              <Icon className="size-icon" name="bell" />
              <span className="notification-dot" />
            </AppButton>
            <AppButton
              label="Open user information"
              onClick={() => setActivePage("Information")}
            >
              <img
                alt="Jesica Smith"
                className="size-avatar rounded-avatar object-cover"
                src="/assets/jesica-smith.png"
              />
            </AppButton>
          </div>
        </header>

        <section className="px-page">
          <div className="status-strip">
            <span className="status-icon">
              <Icon className="size-4" name="shield" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="label">You’re emergency-ready</p>
              <p className="caption mt-0.5">
                Location sharing and alerts are active
              </p>
            </div>
            <span className="live-label">
              <span className="live-dot" />
              Live
            </span>
          </div>
        </section>

        <section className="px-page pt-section">
          <div className="emergency-card">
            <div className="emergency-orbit" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <p className="dark-eyebrow">
                  <span className="alert-pulse" />
                  Emergency assistance
                </p>
                <p className="dark-caption">Available 24/7</p>
              </div>
              <p className="emergency-title mt-5">
                {alertSent ? "Help request sent" : "Need help right now?"}
              </p>
              <p className="emergency-copy mt-1.5">
                {alertSent
                  ? "Responders can see your live location. Stay where you are if it is safe."
                  : "Send your location to the nearest response team in one tap."}
              </p>
              <div className="mt-5 grid grid-cols-[1.35fr_1fr] gap-3">
                <AppButton
                  className={
                    alertSent ? "sos-button sos-button-sent" : "sos-button"
                  }
                  onClick={() => setAlertSent((value) => !value)}
                >
                  <span className="sos-mark">
                    <Icon
                      className="size-5"
                      name={alertSent ? "shield" : "phone"}
                    />
                  </span>
                  {alertSent ? "Request active" : "Send SOS"}
                </AppButton>
                <AppButton
                  className="report-button"
                  onClick={() => setReportOpen((value) => !value)}
                >
                  <Icon className="size-4" name="document" />
                  Report
                </AppButton>
              </div>
            </div>
          </div>
        </section>

        {reportOpen && (
          <section className="px-page pt-3">
            <div className="report-panel">
              <div>
                <p className="label">What’s happening?</p>
                <p className="caption mt-1">
                  Choose an incident type to continue.
                </p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["Flood", "Fire", "Medical"].map((type) => (
                  <AppButton
                    className="incident-choice"
                    key={type}
                    onClick={() => setReportOpen(false)}
                  >
                    {type}
                  </AppButton>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-page pt-section">
          <div className="section-heading">
            <div>
              <p className="section-title">Your safety center</p>
              <p className="caption mt-1">
                Fast access when every second matters
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <AppButton className="quick-card">
              <span className="quick-icon quick-icon-red">
                <Icon className="size-5" name="phone" />
              </span>
              <span>
                <span className="label block">Emergency lines</span>
                <span className="caption mt-1 block">
                  Police, fire & medical
                </span>
              </span>
              <Icon className="ml-auto size-4 text-muted" name="chevron" />
            </AppButton>
            <AppButton className="quick-card">
              <span className="quick-icon quick-icon-blue">
                <Icon className="size-5" name="document" />
              </span>
              <span>
                <span className="label block">My information</span>
                <span className="caption mt-1 block">Medical & contact ID</span>
              </span>
              <Icon className="ml-auto size-4 text-muted" name="chevron" />
            </AppButton>
          </div>
        </section>

        <section className="px-page pt-section">
          <div className="section-heading">
            <div>
              <p className="section-title">Live location</p>
              <p className="caption mt-1">Aguho St., Pembo, Taguig City</p>
            </div>
            <AppButton className="text-action">View map</AppButton>
          </div>
          <div className="map-card mt-3">
            <img
              alt="Map centered near Aguho Street, Pembo, Taguig City"
              className="absolute inset-0 h-full w-full object-cover"
              src="/assets/taguig-map.png"
            />
            <div className="map-shade" />
            <div className="map-pin">
              <span className="map-pin-center" />
            </div>
            <div className="map-info">
              <span className="location-badge">
                <Icon className="size-4" name="location" />
              </span>
              <div className="min-w-0">
                <p className="label truncate">Location sharing is on</p>
                <p className="caption mt-0.5">Updated just now</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-page pt-section">
          <div className="section-heading">
            <div>
              <p className="section-title">Recent activity</p>
              <p className="caption mt-1">Your latest assistance request</p>
            </div>
            <AppButton className="text-action">View all</AppButton>
          </div>
          <AppButton className="activity-card mt-3">
            <span className="activity-icon">
              <Icon className="size-5" name="alert" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="flex items-center gap-2">
                <span className="activity-dot" />
                <span className="label">Flood rescue request</span>
              </span>
              <span className="caption mt-1 block truncate">
                Resolved · Oct 12, 2025
              </span>
            </span>
            <Icon className="size-4 text-muted" name="chevron" />
          </AppButton>
        </section>
      </div>

      <nav className="bottom-nav" aria-label="Primary navigation">
        <div className="mx-auto grid max-w-app grid-cols-4">
          {navItems.map((item) => {
            const selected = activeTab === item.label
            return (
              <AppButton
                className={selected ? "nav-item nav-item-active" : "nav-item"}
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label)
                  if (item.label === "Profile") setActivePage("Profile")
                }}
              >
                <Icon className="size-nav-icon" name={item.icon} />
                <span>{item.label}</span>
              </AppButton>
            )
          })}
        </div>
      </nav>
      {activePage && (
        <DetailPage
          onBack={() => {
            if (activePage === "Profile") {
              setActivePage(null)
              setActiveTab("Home")
            } else {
              setActivePage("Profile")
            }
          }}
          onOpen={setActivePage}
          page={activePage}
        />
      )}
    </main>
  )
}

export default App
