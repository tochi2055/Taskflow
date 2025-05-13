"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useColorTheme } from "@/lib/theme-context"
import { useTheme } from "next-themes"
import { Loader2, ArrowLeft, Moon, Sun, Palette, Bell, Clock } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme: colorTheme, setTheme: setColorTheme, autoThemeChange, setAutoThemeChange } = useColorTheme()
  const { theme, setTheme } = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      projectUpdates: true,
      teamActivity: false,
    },
    appearance: {
      animationsEnabled: true,
      compactMode: false,
      showTaskCount: true,
    },
    privacy: {
      shareUsageData: true,
      allowCookies: true,
    },
  })

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("user-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSettings = (category: keyof typeof settings, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Save to localStorage
      localStorage.setItem("user-settings", JSON.stringify(settings))

      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="appearance">
          <TabsList className="mb-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Customize the appearance of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        {theme === "dark" ? (
                          <Moon className="h-5 w-5 text-primary" />
                        ) : (
                          <Sun className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="dark-mode-toggle" className="sr-only">
                        Dark Mode
                      </Label>
                      <Select value={theme} onValueChange={(value) => setTheme(value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label className="text-base">Color Theme</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred color theme</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="color-theme-select" className="sr-only">
                        Color Theme
                      </Label>
                      <Select
                        value={colorTheme}
                        onValueChange={(value: any) => {
                          setColorTheme(value)
                          if (autoThemeChange) setAutoThemeChange(false)
                        }}
                        disabled={autoThemeChange}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indigo">Indigo</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="amber">Amber</SelectItem>
                          <SelectItem value="rose">Rose</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label className="text-base">Time-based Themes</Label>
                        <p className="text-sm text-muted-foreground">Automatically change theme based on time of day</p>
                      </div>
                    </div>
                    <Switch checked={autoThemeChange} onCheckedChange={setAutoThemeChange} id="time-based-themes" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable animations throughout the application</p>
                    </div>
                    <Switch
                      checked={settings.appearance.animationsEnabled}
                      onCheckedChange={(value) => updateSettings("appearance", "animationsEnabled", value)}
                      id="animations-enabled"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing for a more compact layout</p>
                    </div>
                    <Switch
                      checked={settings.appearance.compactMode}
                      onCheckedChange={(value) => updateSettings("appearance", "compactMode", value)}
                      id="compact-mode"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Show Task Count</Label>
                      <p className="text-sm text-muted-foreground">Display the number of tasks in each column</p>
                    </div>
                    <Switch
                      checked={settings.appearance.showTaskCount}
                      onCheckedChange={(value) => updateSettings("appearance", "showTaskCount", value)}
                      id="show-task-count"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(value) => updateSettings("notifications", "email", value)}
                    id="email-notifications"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(value) => updateSettings("notifications", "push", value)}
                    id="push-notifications"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminders about upcoming and overdue tasks</p>
                  </div>
                  <Switch
                    checked={settings.notifications.taskReminders}
                    onCheckedChange={(value) => updateSettings("notifications", "taskReminders", value)}
                    id="task-reminders"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about project changes</p>
                  </div>
                  <Switch
                    checked={settings.notifications.projectUpdates}
                    onCheckedChange={(value) => updateSettings("notifications", "projectUpdates", value)}
                    id="project-updates"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Team Activity</Label>
                    <p className="text-sm text-muted-foreground">Get notified about team member actions</p>
                  </div>
                  <Switch
                    checked={settings.notifications.teamActivity}
                    onCheckedChange={(value) => updateSettings("notifications", "teamActivity", value)}
                    id="team-activity"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Share Usage Data</Label>
                    <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareUsageData}
                    onCheckedChange={(value) => updateSettings("privacy", "shareUsageData", value)}
                    id="share-usage-data"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Allow Cookies</Label>
                    <p className="text-sm text-muted-foreground">Enable cookies to enhance your experience</p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowCookies}
                    onCheckedChange={(value) => updateSettings("privacy", "allowCookies", value)}
                    id="allow-cookies"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
