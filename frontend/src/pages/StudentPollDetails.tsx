import  { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios"; 
import { BACKEND_URL } from "../../config";
import { Navbar } from "@/components/ui/StudentNavbar";
import { useSearchParams } from "react-router-dom";

export function StudentPollDetails() {
  const [pollData, setPollData] = useState(null);
const [search,]=useSearchParams()
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/poll/details`, {
      headers: {
        Authorization: localStorage.getItem("studenttoken"),
        pollid: search.get("id"),
      }
    })
      .then(response => {
        setPollData(response.data.details);
      })
      .catch(error => {
        console.error("Error fetching poll data:", error);
      });
  }, []);

  if (!pollData) {
    return <div>Loading...</div>; // Loading state
  }

  //@ts-ignore
  const totalVotes = pollData.polled.count;

  return (
    <div className="container mx-auto p-4 max-w-full sm:max-w-4xl">
      <Navbar val="Completed Polls" />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-700 mt-6">
        {//@ts-ignore
        pollData.polled.title}
      </h1>
      <p className="text-md sm:text-lg mb-6 text-gray-600">
        {//@ts-ignore
        pollData.polled.description}
      </p>

      <div className="grid gap-4 mb-8">
        {//@ts-ignore
        pollData.polled.options.map((option) => (
          <Card key={option.id}>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
              <CardTitle className="text-lg font-medium">{option.name}</CardTitle>
              <span className="text-sm font-bold">{option.count} votes</span>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(option.count / totalVotes) * 100} 
                className="h-2 sm:h-3"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue={//@ts-ignore
        pollData.polled.options[0].id.toString()} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {//@ts-ignore
          pollData.polled.options.map((option) => (
            <TabsTrigger 
              key={option.id} 
              value={option.id.toString()}
              className="whitespace-nowrap px-2 sm:px-4 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              {option.name}
            </TabsTrigger>
          ))}
          <TabsTrigger 
            value="not-polled"
            className="whitespace-nowrap px-2 sm:px-4 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
          >
            Not Polled
          </TabsTrigger>
        </TabsList>


        {//@ts-ignore
        pollData.polled.options.map((option) => (
          <TabsContent key={option.id} value={option.id.toString()}>
            <Card>
              <CardHeader>
                <CardTitle>Students who selected {option.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Roll No</TableHead>
                        <TableHead className="text-left">Name</TableHead>
                        {option.reason && <TableHead className="text-left">Reason</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {//@ts-ignore
                      pollData.polled.polled.filter(p => p.option === option.id).map((student) => (
                        <TableRow key={student.studrollno}>
                          <TableCell className="text-left">{student.studrollno}</TableCell>
                          <TableCell className="text-left">{student.student.name}</TableCell>
                          {option.reason && (
                            <TableCell className="text-left">{student.reason ? student.reason : "No reason provided"}</TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="not-polled">
          <Card>
            <CardHeader>
              <CardTitle>Students who have not completed the poll</CardTitle>
            </CardHeader>
            <CardContent>
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
                    {//@ts-ignore
                    pollData.notpolled.map((student) => (
                      <TableRow key={student.rollno}>
                        <TableCell className="text-left">{student.rollno}</TableCell>
                        <TableCell className="text-left">{student.name}</TableCell>
                        <TableCell className="text-left">{student.contactno}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}