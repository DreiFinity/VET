import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const Admin_Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "System Maintenance Scheduled",
      content:
        "We will be performing scheduled maintenance on our servers from 2:00 AM to 4:00 AM EST. During this time, some services may be temporarily unavailable.",
      category: "Maintenance",
      priority: "High",
      target: "All Users",
      status: "Scheduled",
      date: "Jan 15, 2025 - 10:30 AM",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    startDate: "",
    priority: "Low",
    target: "All Users",
    status: "Draft",
  });

  const [search, setSearch] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle dropdown change
  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Publish announcement
  const handlePublish = () => {
    if (!form.title || !form.content || !form.category) {
      alert("Please fill in required fields");
      return;
    }
    const newAnnouncement = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      category: form.category,
      priority: form.priority,
      target: form.target,
      status: form.status,
      date: new Date().toLocaleString(),
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setForm({
      title: "",
      content: "",
      category: "",
      startDate: "",
      priority: "Low",
      target: "All Users",
      status: "Draft",
    });
  };

  // Delete announcement
  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Create New Announcement */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <Label>Title *</Label>
              <Input
                placeholder="Enter announcement title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) => handleSelect("category", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="New Feature">New Feature</SelectItem>
                  <SelectItem value="Policy Update">Policy Update</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          <div>
            <Label>Content *</Label>
            <Textarea
              placeholder="Enter your announcement content here..."
              name="content"
              value={form.content}
              onChange={handleChange}
            />
          </div>

          {/* Date & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date & Time</Label>
              <Input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Priority Level</Label>
              <RadioGroup
                value={form.priority}
                onValueChange={(val) => handleSelect("priority", val)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Low" id="low" />
                  <Label htmlFor="low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="High" id="high" />
                  <Label htmlFor="high">High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Target Audience & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Target Audience</Label>
              <Select
                value={form.target}
                onValueChange={(val) => handleSelect("target", val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Users">All Users</SelectItem>
                  <SelectItem value="Admins">Admins</SelectItem>
                  <SelectItem value="Veterinarians">Veterinarians</SelectItem>
                  <SelectItem value="Pet Owners">Pet Owners</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(val) => handleSelect("status", val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                setForm({
                  title: "",
                  content: "",
                  category: "",
                  startDate: "",
                  priority: "Low",
                  target: "All Users",
                  status: "Draft",
                })
              }
            >
              Clear
            </Button>
            <Button onClick={handlePublish}>Publish Announcement</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Announcements */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Recent Announcements</CardTitle>
          <div className="relative">
            <Input
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements
            .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
            .map((a) => (
              <div
                key={a.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{a.date}</p>
                  <span className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded-full mr-2">
                    {a.priority}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full mr-2">
                    {a.status}
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded-full">
                    {a.category}
                  </span>
                  <p className="mt-2 text-sm">{a.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Audience: {a.target}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin_Announcements;
