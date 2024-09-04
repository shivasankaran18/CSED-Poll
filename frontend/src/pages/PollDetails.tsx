import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data structure
const pollData = {
  title: "Favorite Programming Language",
  description: "Vote for your favorite programming language",
  options: [
    { id: 1, text: "JavaScript", votes: 15, students: [
      { rollNo: "CSE001", name: "Alice Johnson", reason: "Versatile and widely used" },
      { rollNo: "CSE002", name: "Bob Smith", reason: "Great for web development" },
    ]},
    { id: 2, text: "Python", votes: 20, students: [
      { rollNo: "CSE003", name: "Charlie Brown", reason: "Easy to learn and powerful" },
      { rollNo: "CSE004", name: "Diana Ross", reason: "Excellent for data science" },
    ]},
    { id: 3, text: "Java", votes: 10, students: [
      { rollNo: "CSE005", name: "Eva Green", reason: "Robust and platform-independent" },
    ]},
  ],
  notCompleted: [
    { rollNo: "CSE006", name: "Frank White", contactNo: "1234567890" },
    { rollNo: "CSE007", name: "Grace Lee", contactNo: "9876543210" },
  ]
};

const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);

export function PollDetails() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-700">
        {pollData.title}
      </h1>
      <p className="text-md sm:text-lg mb-6 text-gray-600">
        {pollData.description}
      </p>

      <div className="grid gap-4 mb-8">
        {pollData.options.map((option) => (
          <Card key={option.id}>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
              <CardTitle className="text-lg font-medium">{option.text}</CardTitle>
              <span className="text-sm font-bold">{option.votes} votes</span>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(option.votes / totalVotes) * 100} 
                className="h-2 sm:h-3"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue={pollData.options[0].id.toString()} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {pollData.options.map((option) => (
            <TabsTrigger 
              key={option.id} 
              value={option.id.toString()}
              className="whitespace-nowrap px-2 sm:px-4 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              {option.text}
            </TabsTrigger>
          ))}
          <TabsTrigger 
            value="not-completed"
            className="whitespace-nowrap px-2 sm:px-4 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
          >
            Not Completed
          </TabsTrigger>
        </TabsList>

        {pollData.options.map((option) => (
          <TabsContent key={option.id} value={option.id.toString()}>
            <Card>
              <CardHeader>
                <CardTitle>Students who voted for {option.text}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] sm:h-[350px]">
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-left">Roll No</TableHead>
                          <TableHead className="text-left">Name</TableHead>
                          <TableHead className="text-left">Reason</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {option.students.map((student) => (
                          <TableRow key={student.rollNo}>
                            <TableCell className="text-left">{student.rollNo}</TableCell>
                            <TableCell className="text-left">{student.name}</TableCell>
                            <TableCell className="text-left">{student.reason}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="not-completed">
          <Card>
            <CardHeader>
              <CardTitle>Students who have not completed the poll</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] sm:h-[350px]">
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Roll No</TableHead>
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-left">Contact No</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pollData.notCompleted.map((student) => (
                        <TableRow key={student.rollNo}>
                          <TableCell className="text-left">{student.rollNo}</TableCell>
                          <TableCell className="text-left">{student.name}</TableCell>
                          <TableCell className="text-left">{student.contactNo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
