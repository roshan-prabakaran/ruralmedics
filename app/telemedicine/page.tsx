"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Video,
  Calendar,
  User,
  Stethoscope,
  Wifi,
  WifiOff,
  AlertCircle,
  PlayCircle,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneCall,
} from "lucide-react"
import Link from "next/link"

export default function TelemedicinePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [activeTab, setActiveTab] = useState("book")
  const [isOnline, setIsOnline] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [consultationReason, setConsultationReason] = useState("")
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  ]

  const translations = {
    en: {
      title: "Telemedicine",
      subtitle: "Video consultations with healthcare professionals",
      bookAppointment: "Book Appointment",
      myAppointments: "My Appointments",
      consultation: "Consultation",
      availableDoctors: "Available Doctors",
      selectDoctor: "Select Doctor",
      selectDate: "Select Date",
      selectTime: "Select Time",
      reasonForVisit: "Reason for Visit",
      bookNow: "Book Appointment",
      joinCall: "Join Video Call",
      endCall: "End Call",
      callDuration: "Call Duration",
      networkStatus: "Network Status",
      online: "Online",
      offline: "Offline - Limited Features",
      lowBandwidth: "Low Bandwidth Mode",
      audioOnly: "Audio Only Mode",
      upcoming: "Upcoming",
      completed: "Completed",
      cancelled: "Cancelled",
      reschedule: "Reschedule",
      cancel: "Cancel",
      mute: "Mute",
      unmute: "Unmute",
      videoOn: "Video On",
      videoOff: "Video Off",
      back: "Back to Home",
    },
    hi: {
      title: "टेलीमेडिसिन",
      subtitle: "स्वास्थ्य पेशेवरों के साथ वीडियो परामर्श",
      bookAppointment: "अपॉइंटमेंट बुक करें",
      myAppointments: "मेरे अपॉइंटमेंट",
      consultation: "परामर्श",
      availableDoctors: "उपलब्ध डॉक्टर",
      selectDoctor: "डॉक्टर चुनें",
      selectDate: "तारीख चुनें",
      selectTime: "समय चुनें",
      reasonForVisit: "मुलाकात का कारण",
      bookNow: "अपॉइंटमेंट बुक करें",
      joinCall: "वीडियो कॉल में शामिल हों",
      endCall: "कॉल समाप्त करें",
      callDuration: "कॉल की अवधि",
      networkStatus: "नेटवर्क स्थिति",
      online: "ऑनलाइन",
      offline: "ऑफलाइन - सीमित सुविधाएं",
      lowBandwidth: "कम बैंडविड्थ मोड",
      audioOnly: "केवल ऑडियो मोड",
      upcoming: "आगामी",
      completed: "पूर्ण",
      cancelled: "रद्द",
      reschedule: "पुनर्निर्धारण",
      cancel: "रद्द करें",
      mute: "म्यूट",
      unmute: "अनम्यूट",
      videoOn: "वीडियो चालू",
      videoOff: "वीडियो बंद",
      back: "होम पर वापस",
    },
    pa: {
      title: "ਟੈਲੀਮੈਡੀਸਿਨ",
      subtitle: "ਸਿਹਤ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਵੀਡੀਓ ਸਲਾਹ",
      bookAppointment: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
      myAppointments: "ਮੇਰੀਆਂ ਮੁਲਾਕਾਤਾਂ",
      consultation: "ਸਲਾਹ",
      availableDoctors: "ਉਪਲਬਧ ਡਾਕਟਰ",
      selectDoctor: "ਡਾਕਟਰ ਚੁਣੋ",
      selectDate: "ਤਾਰੀਖ ਚੁਣੋ",
      selectTime: "ਸਮਾਂ ਚੁਣੋ",
      reasonForVisit: "ਮੁਲਾਕਾਤ ਦਾ ਕਾਰਨ",
      bookNow: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
      joinCall: "ਵੀਡੀਓ ਕਾਲ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
      endCall: "ਕਾਲ ਖਤਮ ਕਰੋ",
      callDuration: "ਕਾਲ ਦੀ ਮਿਆਦ",
      networkStatus: "ਨੈੱਟਵਰਕ ਸਥਿਤੀ",
      online: "ਔਨਲਾਈਨ",
      offline: "ਔਫਲਾਈਨ - ਸੀਮਤ ਸੁਵਿਧਾਵਾਂ",
      lowBandwidth: "ਘੱਟ ਬੈਂਡਵਿਡਥ ਮੋਡ",
      audioOnly: "ਸਿਰਫ਼ ਆਡੀਓ ਮੋਡ",
      upcoming: "ਆਉਣ ਵਾਲੀਆਂ",
      completed: "ਪੂਰੀਆਂ",
      cancelled: "ਰੱਦ",
      reschedule: "ਮੁੜ ਨਿਰਧਾਰਣ",
      cancel: "ਰੱਦ ਕਰੋ",
      mute: "ਮਿਊਟ",
      unmute: "ਅਨਮਿਊਟ",
      videoOn: "ਵੀਡੀਓ ਚਾਲੂ",
      videoOff: "ਵੀਡੀਓ ਬੰਦ",
      back: "ਘਰ ਵਾਪਸ",
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  // Mock data for doctors
  const doctors = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "General Medicine",
      experience: "15 years",
      languages: ["Hindi", "Punjabi", "English"],
      available: true,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Dr. Priya Singh",
      specialty: "Pediatrics",
      experience: "12 years",
      languages: ["Hindi", "English"],
      available: true,
      rating: 4.9,
    },
    {
      id: "3",
      name: "Dr. Harpreet Kaur",
      specialty: "Gynecology",
      experience: "18 years",
      languages: ["Punjabi", "Hindi", "English"],
      available: false,
      rating: 4.7,
    },
  ]

  // Mock appointments data
  const appointments = [
    {
      id: "1",
      doctorName: "Dr. Rajesh Kumar",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "upcoming",
      reason: "General checkup",
    },
    {
      id: "2",
      doctorName: "Dr. Priya Singh",
      date: "2024-01-10",
      time: "2:00 PM",
      status: "completed",
      reason: "Child vaccination",
    },
  ]

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ]

  // Simulate network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInCall])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime && consultationReason) {
      console.log("[v0] Booking appointment:", {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        reason: consultationReason,
      })

      // Store appointment locally for offline access
      const appointment = {
        id: Date.now().toString(),
        doctorName: doctors.find((d) => d.id === selectedDoctor)?.name,
        date: selectedDate,
        time: selectedTime,
        status: "upcoming",
        reason: consultationReason,
        bookedAt: new Date().toISOString(),
      }

      const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]")
      localStorage.setItem("appointments", JSON.stringify([...existingAppointments, appointment]))

      alert("Appointment booked successfully!")
      setActiveTab("appointments")
    }
  }

  const startCall = () => {
    setIsInCall(true)
    setCallDuration(0)
  }

  const endCall = () => {
    setIsInCall(false)
    setCallDuration(0)
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
                <Video className="w-6 h-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
                  <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Network Status */}
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-primary" />
                ) : (
                  <WifiOff className="w-4 h-4 text-destructive" />
                )}
                <span className="text-sm">{isOnline ? t.online : t.offline}</span>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book">{t.bookAppointment}</TabsTrigger>
            <TabsTrigger value="appointments">{t.myAppointments}</TabsTrigger>
            <TabsTrigger value="consultation">{t.consultation}</TabsTrigger>
          </TabsList>

          {/* Book Appointment Tab */}
          <TabsContent value="book" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.availableDoctors}</CardTitle>
                <CardDescription>Select a doctor and book your consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Doctor Selection */}
                <div className="grid gap-4">
                  {doctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className={`cursor-pointer transition-colors ${
                        selectedDoctor === doctor.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      } ${!doctor.available ? "opacity-50" : ""}`}
                      onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{doctor.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {doctor.specialty} • {doctor.experience}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {doctor.languages.map((lang) => (
                                  <Badge key={lang} variant="secondary" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">★ {doctor.rating}</span>
                            </div>
                            <Badge variant={doctor.available ? "default" : "secondary"} className="mt-1">
                              {doctor.available ? "Available" : "Busy"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Appointment Details */}
                {selectedDoctor && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">{t.selectDate}</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">{t.selectTime}</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {selectedDoctor && selectedDate && selectedTime && (
                  <div className="space-y-2">
                    <Label htmlFor="reason">{t.reasonForVisit}</Label>
                    <Textarea
                      id="reason"
                      value={consultationReason}
                      onChange={(e) => setConsultationReason(e.target.value)}
                      placeholder="Describe your symptoms or reason for consultation..."
                      rows={3}
                    />
                  </div>
                )}

                {selectedDoctor && selectedDate && selectedTime && consultationReason && (
                  <Button onClick={handleBookAppointment} className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t.bookNow}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            appointment.status === "upcoming"
                              ? "default"
                              : appointment.status === "completed"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {appointment.status === "upcoming" && t.upcoming}
                          {appointment.status === "completed" && t.completed}
                          {appointment.status === "cancelled" && t.cancelled}
                        </Badge>
                        {appointment.status === "upcoming" && (
                          <Button size="sm" onClick={() => setActiveTab("consultation")}>
                            <Video className="w-4 h-4 mr-2" />
                            {t.joinCall}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Consultation Tab */}
          <TabsContent value="consultation" className="space-y-6">
            {!isInCall ? (
              <Card>
                <CardHeader>
                  <CardTitle>Video Consultation</CardTitle>
                  <CardDescription>Join your scheduled consultation with the doctor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Click "Join Call" to start your consultation</p>
                    </div>
                  </div>
                  <Button onClick={startCall} className="w-full" size="lg">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {t.joinCall}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Active Consultation</CardTitle>
                      <CardDescription>
                        {t.callDuration}: {formatDuration(callDuration)}
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative">
                    <div className="text-center text-white">
                      <User className="w-16 h-16 mx-auto mb-4" />
                      <p>Dr. Rajesh Kumar</p>
                    </div>

                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <Button
                        size="sm"
                        variant={isMuted ? "destructive" : "secondary"}
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant={isVideoOn ? "secondary" : "destructive"}
                        onClick={() => setIsVideoOn(!isVideoOn)}
                      >
                        {isVideoOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={endCall}>
                        <PhoneCall className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Low Bandwidth Options */}
                  {!isOnline && (
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-800">{t.lowBandwidth}</p>
                            <p className="text-sm text-yellow-700">Switch to audio-only mode to save bandwidth</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          {t.audioOnly}
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
