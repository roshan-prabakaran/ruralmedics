"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  Video,
  FileText,
  Pill,
  Stethoscope,
  Users,
  QrCode,
  Globe,
  Phone,
  Calendar,
  Activity,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

export default function RuralMedicsHome() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  ]

  const translations = {
    en: {
      title: "RuralMedics",
      subtitle: "Digital Healthcare for Rural Punjab",
      telemedicine: "Telemedicine",
      telemedicineDesc: "Video consultations with doctors",
      healthRecords: "Health Records",
      healthRecordsDesc: "Access your medical history",
      medicineTracker: "Medicine Tracker",
      medicineTrackerDesc: "Check medicine availability",
      symptomChecker: "Symptom Checker",
      symptomCheckerDesc: "AI-powered health guidance",
      emergencyContact: "Emergency Contact",
      qrAccess: "QR Code Access",
      offlineMode: "Works Offline",
      multiLanguage: "Multi-Language Support",
      registerPatient: "Register New Patient",
      registerPatientDesc: "Create patient profile for healthcare services",
    },
    hi: {
      title: "रूरलमेडिक्स",
      subtitle: "ग्रामीण पंजाब के लिए डिजिटल स्वास्थ्य सेवा",
      telemedicine: "टेलीमेडिसिन",
      telemedicineDesc: "डॉक्टरों के साथ वीडियो परामर्श",
      healthRecords: "स्वास्थ्य रिकॉर्ड",
      healthRecordsDesc: "अपना चिकित्सा इतिहास देखें",
      medicineTracker: "दवा ट्रैकर",
      medicineTrackerDesc: "दवा की उपलब्धता जांचें",
      symptomChecker: "लक्षण जांचकर्ता",
      symptomCheckerDesc: "AI-संचालित स्वास्थ्य मार्गदर्शन",
      emergencyContact: "आपातकालीन संपर्क",
      qrAccess: "QR कोड एक्सेस",
      offlineMode: "ऑफलाइन काम करता है",
      multiLanguage: "बहुभाषी समर्थन",
      registerPatient: "नया रोगी पंजीकरण",
      registerPatientDesc: "स्वास्थ्य सेवाओं के लिए रोगी प्रोफ़ाइल बनाएं",
    },
    pa: {
      title: "ਰੂਰਲਮੇਡਿਕਸ",
      subtitle: "ਪੇਂਡੂ ਪੰਜਾਬ ਲਈ ਡਿਜੀਟਲ ਸਿਹਤ ਸੇਵਾ",
      telemedicine: "ਟੈਲੀਮੈਡੀਸਿਨ",
      telemedicineDesc: "ਡਾਕਟਰਾਂ ਨਾਲ ਵੀਡੀਓ ਸਲਾਹ",
      healthRecords: "ਸਿਹਤ ਰਿਕਾਰਡ",
      healthRecordsDesc: "ਆਪਣਾ ਮੈਡੀਕਲ ਇਤਿਹਾਸ ਦੇਖੋ",
      medicineTracker: "ਦਵਾਈ ਟਰੈਕਰ",
      medicineTrackerDesc: "ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ ਜਾਂਚੋ",
      symptomChecker: "ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
      symptomCheckerDesc: "AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਮਾਰਗਦਰਸ਼ਨ",
      emergencyContact: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
      qrAccess: "QR ਕੋਡ ਪਹੁੰਚ",
      offlineMode: "ਔਫਲਾਈਨ ਕੰਮ ਕਰਦਾ ਹੈ",
      multiLanguage: "ਬਹੁ-ਭਾਸ਼ਾ ਸਹਾਇਤਾ",
      registerPatient: "ਨਵਾਂ ਮਰੀਜ਼ ਰਜਿਸਟਰ ਕਰੋ",
      registerPatientDesc: "ਸਿਹਤ ਸੇਵਾਵਾਂ ਲਈ ਮਰੀਜ਼ ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ",
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
                <p className="text-sm text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="text-xs"
                >
                  {lang.native}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">{t.multiLanguage}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Activity className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <p className="text-sm font-medium">{t.offlineMode}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <QrCode className="w-8 h-8 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">{t.qrAccess}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Phone className="w-8 h-8 mx-auto mb-2 text-destructive" />
              <p className="text-sm font-medium">{t.emergencyContact}</p>
            </CardContent>
          </Card>
        </div>

        {/* Patient Registration Card */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-primary">{t.registerPatient}</CardTitle>
                <CardDescription>{t.registerPatientDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/register">
              <Button className="w-full" size="lg">
                <UserPlus className="w-4 h-4 mr-2" />
                {t.registerPatient}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Telemedicine */}
          <Link href="/telemedicine">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t.telemedicine}</CardTitle>
                    <CardDescription>{t.telemedicineDesc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Health Records */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t.healthRecords}</CardTitle>
                  <CardDescription>{t.healthRecordsDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full" size="lg">
                <FileText className="w-4 h-4 mr-2" />
                View Records
              </Button>
            </CardContent>
          </Card>

          {/* Medicine Tracker */}
          <Link href="/medicines">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                    <Pill className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t.medicineTracker}</CardTitle>
                    <CardDescription>{t.medicineTrackerDesc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Pill className="w-4 h-4 mr-2" />
                  Check Availability
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Symptom Checker */}
          <Link href="/symptoms">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t.symptomChecker}</CardTitle>
                    <CardDescription>{t.symptomCheckerDesc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Check Symptoms
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Nabha Civil Hospital Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">173</div>
                <div className="text-sm text-muted-foreground">Villages Served</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">11/23</div>
                <div className="text-sm text-muted-foreground">Doctors Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Emergency Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">31%</div>
                <div className="text-sm text-muted-foreground">Internet Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}