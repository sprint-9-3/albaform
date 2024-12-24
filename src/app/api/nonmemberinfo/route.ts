import { NextResponse } from "next/server";

type nenMemberDataType = {
  applicantId: number;
  updatedAt: string;
  createdAt: string;
  status: string;
  introduction: string;
  resumeName: string;
  resumeId: number;
  experienceMonths: number;
  phoneNumber: string;
  name: string;
  id: number;
};

let nonMemberData: nenMemberDataType;

// GET 요청 처리
export async function GET() {
  if (!nonMemberData) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
  return NextResponse.json({ nonMemberInfo: nonMemberData });
}

// POST 요청 처리
export async function POST(req: Request) {
  try {
    const body = await req.json();
    nonMemberData = body.nonMemberInfo;
    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
}
