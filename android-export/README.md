# ResQLink Android XML export

Open the `android-export` directory in Android Studio and allow Gradle to sync.

The project uses classic Android XML layouts and one Kotlin activity:

- `activity_dashboard.xml` — user dashboard
- `activity_more.xml` — navigation to all secondary screens
- `activity_settings.xml` — working preference switches
- `activity_contacts.xml` — emergency numbers and a working 911 dial action
- `activity_about.xml` — app and location explanation
- `activity_information.xml` — user and medical information
- `activity_terms.xml` — terms and agreement
- `MainActivity.kt` — screen navigation, SOS state, report action, and phone dial action

The sample namespace/application ID is `com.resqlink.app`. Change both values in
`app/build.gradle.kts` and move `MainActivity.kt` if your final package name is different.
