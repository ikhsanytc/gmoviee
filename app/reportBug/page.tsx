"use client";

import React from "react";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import ReportBugForm from "@/components/ReportBug/ReportBugForm";
import { Card } from "@/components/ui/card";

const ReportBug: React.FC = () => {
  return (
    <Provider center>
      <Navbar />
      <Card className="w-full md:w-1/2">
        <ReportBugForm />
      </Card>
    </Provider>
  );
};

export default ReportBug;
