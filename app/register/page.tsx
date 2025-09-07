"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, Phone, MapPin, QrCode, Save, UserPlus, Heart, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PatientRegistration() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    alternatePhone: "",
    village: "",
    district: "Patiala",
    state: "Punjab",
    pincode: "",
    aadharNumber: "",
    bloodGroup: "",
    allergies: "",
    chronicConditions: "",
    emergencyContact: "",
    emergencyRelation: "",
    consentTelehealth: false,
    consentDataSharing: false,
  })

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  ]

  const translations = {
    en: {
      title: "Patient Registration",
      subtitle: "Register for ruralmedics Healthcare Services",
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      fatherName: "Father's Name",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      contactInfo: "Contact Information",
      phoneNumber: "Phone Number",
      alternatePhone: "Alternate Phone",
      address: "Address Information",
      village: "Village",
      district: "District",
      state: "State",
      pincode: "PIN Code",
      aadharNumber: "Aadhar Number",
      medicalInfo: "Medical Information",
      bloodGroup: "Blood Group",
      allergies: "Known Allergies",
      chronicConditions: "Chronic Conditions",
      emergencyContact: "Emergency Contact",
      emergencyRelation: "Relation",
      consent: "Consent & Permissions",
      consentTelehealth: "I consent to telehealth consultations",
      consentDataSharing: "I consent to sharing medical data with healthcare providers",
      register: "Register Patient",
      generateQR: "Generate QR Code",
      back: "Back to Home",
      required: "Required field",
    },
    hi: {
      title: "रोगी पंजीकरण",
      subtitle: "आरोग्य सेवा स्वास्थ्य सेवाओं के लिए पंजीकरण करें",
      personalInfo: "व्यक्तिगत जानकारी",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      fatherName: "पिता का नाम",
      dateOfBirth: "जन्म तिथि",
      gender: "लिंग",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      contactInfo: "संपर्क जानकारी",
      phoneNumber: "फोन नंबर",
      alternatePhone: "वैकल्पिक फोन",
      address: "पता जानकारी",
      village: "गांव",
      district: "जिला",
      state: "राज्य",
      pincode: "पिन कोड",
      aadharNumber: "आधार नंबर",
      medicalInfo: "चिकित्सा जानकारी",
      bloodGroup: "रक्त समूह",
      allergies: "ज्ञात एलर्जी",
      chronicConditions: "पुरानी बीमारियां",
      emergencyContact: "आपातकालीन संपर्क",
      emergencyRelation: "रिश्ता",
      consent: "सहमति और अनुमतियां",
      consentTelehealth: "मैं टेलीहेल्थ परामर्श के लिए सहमति देता हूं",
      consentDataSharing: "मैं स्वास्थ्य प्रदाताओं के साथ चिकित्सा डेटा साझा करने की सहमति देता हूं",
      register: "रोगी पंजीकरण",
      generateQR: "QR कोड जेनरेट करें",
      back: "होम पर वापस",
      required: "आवश्यक फील्ड",
    },
    pa: {
      title: "ਮਰੀਜ਼ ਰਜਿਸਟਰੇਸ਼ਨ",
      subtitle: "ਆਰੋਗਿਆ ਸੇਵਾ ਸਿਹਤ ਸੇਵਾਵਾਂ ਲਈ ਰਜਿਸਟਰ ਕਰੋ",
      personalInfo: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ",
      firstName: "ਪਹਿਲਾ ਨਾਮ",
      lastName: "ਆਖਰੀ ਨਾਮ",
      fatherName: "ਪਿਤਾ ਦਾ ਨਾਮ",
      dateOfBirth: "ਜਨਮ ਮਿਤੀ",
      gender: "ਲਿੰਗ",
      male: "ਮਰਦ",
      female: "ਔਰਤ",
      other: "ਹੋਰ",
      contactInfo: "ਸੰਪਰਕ ਜਾਣਕਾਰੀ",
      phoneNumber: "ਫੋਨ ਨੰਬਰ",
      alternatePhone: "ਵਿਕਲਪਿਕ ਫੋਨ",
      address: "ਪਤਾ ਜਾਣਕਾਰੀ",
      village: "ਪਿੰਡ",
      district: "ਜ਼ਿਲ੍ਹਾ",
      state: "ਰਾਜ",
      pincode: "ਪਿੰਨ ਕੋਡ",
      aadharNumber: "ਆਧਾਰ ਨੰਬਰ",
      medicalInfo: "ਮੈਡੀਕਲ ਜਾਣਕਾਰੀ",
      bloodGroup: "ਖੂਨ ਦਾ ਗਰੁੱਪ",
      allergies: "ਜਾਣੀਆਂ ਐਲਰਜੀਆਂ",
      chronicConditions: "ਪੁਰਾਣੀਆਂ ਬਿਮਾਰੀਆਂ",
      emergencyContact: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
      emergencyRelation: "ਰਿਸ਼ਤਾ",
      consent: "ਸਹਿਮਤੀ ਅਤੇ ਇਜਾਜ਼ਤਾਂ",
      consentTelehealth: "ਮੈਂ ਟੈਲੀਹੈਲਥ ਸਲਾਹ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ ਹਾਂ",
      consentDataSharing: "ਮੈਂ ਸਿਹਤ ਪ੍ਰਦਾਤਾਵਾਂ ਨਾਲ ਮੈਡੀਕਲ ਡੇਟਾ ਸਾਂਝਾ ਕਰਨ ਦੀ ਸਹਿਮਤੀ ਦਿੰਦਾ ਹਾਂ",
      register: "ਮਰੀਜ਼ ਰਜਿਸਟਰ ਕਰੋ",
      generateQR: "QR ਕੋਡ ਬਣਾਓ",
      back: "ਘਰ ਵਾਪਸ",
      required: "ਲੋੜੀਂਦਾ ਖੇਤਰ",
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const relations = ["Father", "Mother", "Spouse", "Son", "Daughter", "Brother", "Sister", "Other"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate patient ID and QR code
    const patientId = `ARG${Date.now().toString().slice(-6)}`
    console.log("[v0] Patient registered:", { patientId, ...formData })

    // In a real app, this would save to local storage for offline access
    localStorage.setItem(
      `patient_${patientId}`,
      JSON.stringify({ patientId, ...formData, registeredAt: new Date().toISOString() }),
    )

    alert(`Patient registered successfully! Patient ID: ${patientId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.back}
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
                  <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                </div>
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

      {/* Registration Form */}
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.firstName} *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.lastName} *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fatherName">{t.fatherName} *</Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">{t.dateOfBirth} *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t.gender} *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">{t.male}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">{t.female}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">{t.other}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {t.contactInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">{t.phoneNumber} *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">{t.alternatePhone}</Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t.address}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village">{t.village} *</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => handleInputChange("village", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">{t.pincode} *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">{t.district}</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t.state}</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadharNumber">{t.aadharNumber}</Label>
                <Input
                  id="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                  placeholder="XXXX XXXX XXXX"
                  maxLength={12}
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {t.medicalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">{t.bloodGroup}</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">{t.emergencyRelation}</Label>
                  <Select
                    value={formData.emergencyRelation}
                    onValueChange={(value) => handleInputChange("emergencyRelation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      {relations.map((relation) => (
                        <SelectItem key={relation} value={relation}>
                          {relation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">{t.emergencyContact}</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">{t.allergies}</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="List any known allergies..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chronicConditions">{t.chronicConditions}</Label>
                <Textarea
                  id="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={(e) => handleInputChange("chronicConditions", e.target.value)}
                  placeholder="List any chronic conditions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {t.consent}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consentTelehealth"
                  checked={formData.consentTelehealth}
                  onCheckedChange={(checked) => handleInputChange("consentTelehealth", checked as boolean)}
                />
                <Label htmlFor="consentTelehealth" className="text-sm">
                  {t.consentTelehealth}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consentDataSharing"
                  checked={formData.consentDataSharing}
                  onCheckedChange={(checked) => handleInputChange("consentDataSharing", checked as boolean)}
                />
                <Label htmlFor="consentDataSharing" className="text-sm">
                  {t.consentDataSharing}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {t.register}
            </Button>
            <Button type="button" variant="outline" size="lg">
              <QrCode className="w-4 h-4 mr-2" />
              {t.generateQR}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
