"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ArrowLeft,
  Stethoscope,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Calendar,
  Activity,
  Thermometer,
  Heart,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function SymptomChecker() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [symptomDetails, setSymptomDetails] = useState({
    duration: "",
    severity: "",
    additionalInfo: "",
    age: "",
    gender: "",
    existingConditions: [] as string[],
  })
  const [assessment, setAssessment] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  ]

  const translations = {
    en: {
      title: "AI Symptom Checker",
      subtitle: "Get preliminary health guidance based on your symptoms",
      selectSymptoms: "Select Your Symptoms",
      symptomDetails: "Symptom Details",
      assessment: "Health Assessment",
      commonSymptoms: "Common Symptoms",
      bodyParts: "Body Parts",
      duration: "How long have you had these symptoms?",
      severity: "How severe are your symptoms?",
      mild: "Mild",
      moderate: "Moderate",
      severe: "Severe",
      additionalInfo: "Additional Information",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      existingConditions: "Existing Medical Conditions",
      analyze: "Analyze Symptoms",
      analyzing: "Analyzing...",
      next: "Next",
      previous: "Previous",
      back: "Back to Home",
      urgencyLevel: "Urgency Level",
      recommendations: "Recommendations",
      possibleConditions: "Possible Conditions",
      whenToSeek: "When to Seek Care",
      selfCare: "Self Care",
      clinicVisit: "Clinic Visit",
      emergency: "Emergency",
      bookConsultation: "Book Consultation",
      callEmergency: "Call Emergency",
      disclaimer: "This is not a substitute for professional medical advice",
      lowRisk: "Low Risk",
      moderateRisk: "Moderate Risk",
      highRisk: "High Risk",
    },
    hi: {
      title: "AI लक्षण जांचकर्ता",
      subtitle: "अपने लक्षणों के आधार पर प्रारंभिक स्वास्थ्य मार्गदर्शन प्राप्त करें",
      selectSymptoms: "अपने लक्षण चुनें",
      symptomDetails: "लक्षण विवरण",
      assessment: "स्वास्थ्य मूल्यांकन",
      commonSymptoms: "सामान्य लक्षण",
      bodyParts: "शरीर के अंग",
      duration: "आपको ये लक्षण कितने समय से हैं?",
      severity: "आपके लक्षण कितने गंभीर हैं?",
      mild: "हल्का",
      moderate: "मध्यम",
      severe: "गंभीर",
      additionalInfo: "अतिरिक्त जानकारी",
      age: "उम्र",
      gender: "लिंग",
      male: "पुरुष",
      female: "महिला",
      existingConditions: "मौजूदा चिकित्सा स्थितियां",
      analyze: "लक्षणों का विश्लेषण करें",
      analyzing: "विश्लेषण कर रहे हैं...",
      next: "अगला",
      previous: "पिछला",
      back: "होम पर वापस",
      urgencyLevel: "तात्कालिकता स्तर",
      recommendations: "सिफारिशें",
      possibleConditions: "संभावित स्थितियां",
      whenToSeek: "कब देखभाल लें",
      selfCare: "स्व-देखभाल",
      clinicVisit: "क्लिनिक जाएं",
      emergency: "आपातकाल",
      bookConsultation: "परामर्श बुक करें",
      callEmergency: "आपातकाल कॉल करें",
      disclaimer: "यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है",
      lowRisk: "कम जोखिम",
      moderateRisk: "मध्यम जोखिम",
      highRisk: "उच्च जोखिम",
    },
    pa: {
      title: "AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
      subtitle: "ਆਪਣੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਸ਼ੁਰੂਆਤੀ ਸਿਹਤ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ",
      selectSymptoms: "ਆਪਣੇ ਲੱਛਣ ਚੁਣੋ",
      symptomDetails: "ਲੱਛਣ ਵੇਰਵੇ",
      assessment: "ਸਿਹਤ ਮੁਲਾਂਕਣ",
      commonSymptoms: "ਆਮ ਲੱਛਣ",
      bodyParts: "ਸਰੀਰ ਦੇ ਅੰਗ",
      duration: "ਤੁਹਾਨੂੰ ਇਹ ਲੱਛਣ ਕਿੰਨੇ ਸਮੇਂ ਤੋਂ ਹਨ?",
      severity: "ਤੁਹਾਡੇ ਲੱਛਣ ਕਿੰਨੇ ਗੰਭੀਰ ਹਨ?",
      mild: "ਹਲਕਾ",
      moderate: "ਮੱਧਮ",
      severe: "ਗੰਭੀਰ",
      additionalInfo: "ਵਾਧੂ ਜਾਣਕਾਰੀ",
      age: "ਉਮਰ",
      gender: "ਲਿੰਗ",
      male: "ਮਰਦ",
      female: "ਔਰਤ",
      existingConditions: "ਮੌਜੂਦਾ ਮੈਡੀਕਲ ਸਥਿਤੀਆਂ",
      analyze: "ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
      analyzing: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਹੇ ਹਾਂ...",
      next: "ਅਗਲਾ",
      previous: "ਪਿਛਲਾ",
      back: "ਘਰ ਵਾਪਸ",
      urgencyLevel: "ਤਤਕਾਲਤਾ ਪੱਧਰ",
      recommendations: "ਸਿਫਾਰਸ਼ਾਂ",
      possibleConditions: "ਸੰਭਾਵਿਤ ਸਥਿਤੀਆਂ",
      whenToSeek: "ਕਦੋਂ ਦੇਖਭਾਲ ਲਓ",
      selfCare: "ਸਵੈ-ਦੇਖਭਾਲ",
      clinicVisit: "ਕਲੀਨਿਕ ਜਾਓ",
      emergency: "ਐਮਰਜੈਂਸੀ",
      bookConsultation: "ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
      callEmergency: "ਐਮਰਜੈਂਸੀ ਕਾਲ ਕਰੋ",
      disclaimer: "ਇਹ ਪੇਸ਼ੇਵਰ ਮੈਡੀਕਲ ਸਲਾਹ ਦਾ ਵਿਕਲਪ ਨਹੀਂ ਹੈ",
      lowRisk: "ਘੱਟ ਜੋਖਮ",
      moderateRisk: "ਮੱਧਮ ਜੋਖਮ",
      highRisk: "ਉੱਚ ਜੋਖਮ",
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  const commonSymptoms = [
    { id: "fever", name: "Fever", icon: Thermometer },
    { id: "headache", name: "Headache", icon: Brain },
    { id: "cough", name: "Cough", icon: Activity },
    { id: "sore_throat", name: "Sore Throat", icon: Activity },
    { id: "body_ache", name: "Body Ache", icon: Activity },
    { id: "fatigue", name: "Fatigue", icon: Activity },
    { id: "nausea", name: "Nausea", icon: Activity },
    { id: "diarrhea", name: "Diarrhea", icon: Activity },
    { id: "chest_pain", name: "Chest Pain", icon: Heart },
    { id: "shortness_breath", name: "Shortness of Breath", icon: Activity },
    { id: "dizziness", name: "Dizziness", icon: Brain },
    { id: "abdominal_pain", name: "Abdominal Pain", icon: Activity },
  ]

  const medicalConditions = [
    "Diabetes",
    "High Blood Pressure",
    "Heart Disease",
    "Asthma",
    "Kidney Disease",
    "Liver Disease",
    "Thyroid Problems",
    "Arthritis",
  ]

  const durations = [
    { value: "few_hours", label: "A few hours" },
    { value: "1_day", label: "1 day" },
    { value: "2_3_days", label: "2-3 days" },
    { value: "1_week", label: "About a week" },
    { value: "more_week", label: "More than a week" },
  ]

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
    )
  }

  const handleConditionToggle = (condition: string) => {
    setSymptomDetails((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.includes(condition)
        ? prev.existingConditions.filter((c) => c !== condition)
        : [...prev.existingConditions, condition],
    }))
  }

  const analyzeSymptoms = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      // Mock assessment based on selected symptoms
      let urgencyLevel = "low"
      let riskLevel = t.lowRisk
      const recommendations = []
      const possibleConditions = []

      if (selectedSymptoms.includes("chest_pain") || selectedSymptoms.includes("shortness_breath")) {
        urgencyLevel = "high"
        riskLevel = t.highRisk
        recommendations.push("Seek immediate medical attention")
        recommendations.push("Call emergency services if symptoms worsen")
        possibleConditions.push("Heart condition", "Respiratory issue")
      } else if (selectedSymptoms.includes("fever") && selectedSymptoms.includes("cough")) {
        urgencyLevel = "moderate"
        riskLevel = t.moderateRisk
        recommendations.push("Consider consulting a doctor")
        recommendations.push("Monitor symptoms closely")
        recommendations.push("Rest and stay hydrated")
        possibleConditions.push("Viral infection", "Respiratory infection")
      } else {
        urgencyLevel = "low"
        riskLevel = t.lowRisk
        recommendations.push("Self-care measures may be sufficient")
        recommendations.push("Monitor symptoms")
        recommendations.push("Consult doctor if symptoms persist")
        possibleConditions.push("Minor illness", "Common cold")
      }

      setAssessment({
        urgencyLevel,
        riskLevel,
        recommendations,
        possibleConditions,
        careLevel: urgencyLevel === "high" ? "emergency" : urgencyLevel === "moderate" ? "clinic" : "self_care",
      })

      setIsAnalyzing(false)
      setCurrentStep(3)
    }, 2000)
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "moderate":
        return <Clock className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
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
                <Stethoscope className="w-6 h-6 text-primary" />
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-0.5 mx-2 ${currentStep > step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Symptoms */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.selectSymptoms}</CardTitle>
              <CardDescription>Select all symptoms you are currently experiencing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">{t.commonSymptoms}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {commonSymptoms.map((symptom) => {
                    const IconComponent = symptom.icon
                    return (
                      <Card
                        key={symptom.id}
                        className={`cursor-pointer transition-colors ${
                          selectedSymptoms.includes(symptom.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleSymptomToggle(symptom.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <p className="text-sm font-medium">{symptom.name}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(2)} disabled={selectedSymptoms.length === 0}>
                  {t.next}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Symptom Details */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.symptomDetails}</CardTitle>
              <CardDescription>Provide additional details about your symptoms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Symptoms Summary */}
              <div>
                <Label className="text-base font-medium">Selected Symptoms:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSymptoms.map((symptomId) => {
                    const symptom = commonSymptoms.find((s) => s.id === symptomId)
                    return (
                      <Badge key={symptomId} variant="secondary">
                        {symptom?.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label>{t.duration}</Label>
                <Select
                  value={symptomDetails.duration}
                  onValueChange={(value) => setSymptomDetails((prev) => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <Label>{t.severity}</Label>
                <RadioGroup
                  value={symptomDetails.severity}
                  onValueChange={(value) => setSymptomDetails((prev) => ({ ...prev, severity: value }))}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="mild" />
                    <Label htmlFor="mild">{t.mild}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">{t.moderate}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="severe" />
                    <Label htmlFor="severe">{t.severe}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">{t.age}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={symptomDetails.age}
                    onChange={(e) => setSymptomDetails((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter age"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.gender}</Label>
                  <RadioGroup
                    value={symptomDetails.gender}
                    onValueChange={(value) => setSymptomDetails((prev) => ({ ...prev, gender: value }))}
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
                  </RadioGroup>
                </div>
              </div>

              {/* Existing Conditions */}
              <div className="space-y-2">
                <Label>{t.existingConditions}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {medicalConditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={symptomDetails.existingConditions.includes(condition)}
                        onCheckedChange={() => handleConditionToggle(condition)}
                      />
                      <Label htmlFor={condition} className="text-sm">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additional">{t.additionalInfo}</Label>
                <Textarea
                  id="additional"
                  value={symptomDetails.additionalInfo}
                  onChange={(e) => setSymptomDetails((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                  placeholder="Any additional symptoms or information..."
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  {t.previous}
                </Button>
                <Button onClick={analyzeSymptoms} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      {t.analyzing}
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      {t.analyze}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Assessment Results */}
        {currentStep === 3 && assessment && (
          <div className="space-y-6">
            {/* Urgency Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {t.urgencyLevel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={`${getUrgencyColor(assessment.urgencyLevel)} text-base px-4 py-2`}>
                  {getUrgencyIcon(assessment.urgencyLevel)}
                  <span className="ml-2">{assessment.riskLevel}</span>
                </Badge>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>{t.recommendations}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessment.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Possible Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>{t.possibleConditions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {assessment.possibleConditions.map((condition: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>{t.whenToSeek}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessment.careLevel === "emergency" && (
                  <Button variant="destructive" className="w-full" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    {t.callEmergency}
                  </Button>
                )}

                {(assessment.careLevel === "clinic" || assessment.careLevel === "emergency") && (
                  <Link href="/telemedicine">
                    <Button className="w-full" size="lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.bookConsultation}
                    </Button>
                  </Link>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentStep(1)
                    setSelectedSymptoms([])
                    setAssessment(null)
                    setSymptomDetails({
                      duration: "",
                      severity: "",
                      additionalInfo: "",
                      age: "",
                      gender: "",
                      existingConditions: [],
                    })
                  }}
                >
                  Check New Symptoms
                </Button>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> {t.disclaimer}. Always consult with a healthcare professional for proper
                    diagnosis and treatment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
