package com.resqlink.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        showDashboard()
    }

    private fun showDashboard() {
        setContentView(R.layout.activity_dashboard)
        findViewById<Button>(R.id.btnSos).setOnClickListener {
            it.isEnabled = false
            (it as Button).text = "Request active"
            Toast.makeText(this, "SOS sent. Your live location is being shared.", Toast.LENGTH_LONG).show()
        }
        findViewById<Button>(R.id.btnReport).setOnClickListener {
            Toast.makeText(this, "Incident report started", Toast.LENGTH_SHORT).show()
        }
        findViewById<Button>(R.id.btnMore).setOnClickListener { showMore() }
        findViewById<Button>(R.id.btnInformation).setOnClickListener { showInformation() }
    }

    private fun showMore() {
        setContentView(R.layout.activity_more)
        bindBack()
        findViewById<Button>(R.id.btnInformation).setOnClickListener { showInformation() }
        findViewById<Button>(R.id.btnSettings).setOnClickListener { showSimple(R.layout.activity_settings) }
        findViewById<Button>(R.id.btnContacts).setOnClickListener { showContacts() }
        findViewById<Button>(R.id.btnAbout).setOnClickListener { showAbout() }
        findViewById<Button>(R.id.btnTerms).setOnClickListener { showSimple(R.layout.activity_terms) }
    }

    private fun showInformation() {
        setContentView(R.layout.activity_information)
        bindBack()
    }

    private fun showContacts() {
        setContentView(R.layout.activity_contacts)
        bindBack()
        findViewById<Button>(R.id.btnCall911).setOnClickListener {
            startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:911")))
        }
    }

    private fun showAbout() {
        setContentView(R.layout.activity_about)
        bindBack()
        findViewById<Button>(R.id.btnTerms).setOnClickListener { showSimple(R.layout.activity_terms) }
    }

    private fun showSimple(layout: Int) {
        setContentView(layout)
        bindBack()
    }

    private fun bindBack() {
        findViewById<Button>(R.id.btnBack).setOnClickListener { showMore() }
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        showDashboard()
    }
}
