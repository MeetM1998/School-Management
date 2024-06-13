import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ApprovalIcon from '@mui/icons-material/Approval';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExamListIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventsIcon from '@mui/icons-material/Event';
import ReportCardIcon from '@mui/icons-material/Assessment';
import ParentsIcon from '@mui/icons-material/Group';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

export const pages = [
  {
    name: "View Profile",
    link: "studentProfile",
  },
  {
    name: "Change Password",
    link: "changePassword",
  },
  {
    name: "Logout",
    link: "",
  },
];

const adminData = [
  {
    text: "Dashboard",
    icon: (
      <DashboardIcon
        sx={{
          color: "black",
          transition: "color 0.3s ease",
        }}
      />
    ),
    path: "/admin/dashboard",
  },
  {
    text: "Student List",
    icon: (
      <PeopleIcon
        sx={{
          color: "black",
          transition: "color 0.3s ease",
        }}
      />
    ),
    path: "StudentList",
  },
  {
    text: "Teacher List",
    icon: (
      <SchoolIcon
        sx={{
          color: "black",
          transition: "color 0.3s ease",
        }}
      />
    ),
    path: "/admin/teachers",
  },
  {
    text: "Parent List",
    icon: (
      <ParentsIcon
        sx={{
          color: "black",
          transition: "color 0.3s ease",
        }}
      />
    ),
    path: "/admin/parents",
  },
  {
    text: "Exam",
    icon: (
      <MenuBookRoundedIcon
        sx={{
          color: "black",
          transition: "color 0.3s ease",
        }}
      />
    ),
    path: "/admin/exam",
  },
  {
    text: "News",
    icon: (
      <NewspaperRoundedIcon
        sx={{
          color: "black",
          transition: "color 0.3s ease",
        }}
      />
    ),
    path: "/admin/news",
  },
  {
    text: "Events",
    icon: (
      <EmojiEventsRoundedIcon
        sx={{
          color: "black",
          transition: "color 0.3s ease",
        }}
      />
    ),
    path: "/admin/events",
  },
];

export const sidebarItems = (userDetails) => {
  switch (userDetails) {
    case 'teacher':
      return [
        {
          text: "Dashboard",
          icon: (
            <DashboardIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "white",
                },
              }}
            />
          ),
          path: "/teacher/dashboard",
        },
        {
          text: "Student List",
          icon: (
            <PeopleIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "StudentList",
        },
        {
          text: "Assignments",
          icon: (
            <AssignmentIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/teacher/assignments",
        },
        {
          text: "Student Leave Approvals",
          icon: (
            <ApprovalIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/teacher/leave-approvals",
        },
        {
          text: "Apply Leave",
          icon: (
            <FlightTakeoffIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/teacher/apply-leave",
        },
        {
          text: "Mark Attendance",
          icon: (
            <PlaylistAddCheckIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/teacher/mark-attendance",
        },
      ];
    case 'student':
      return [
        {
          text: "Dashboard",
          icon: (
            <DashboardIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "dashboard/studentList",
        },
        {
          text: "Assignments List",
          icon: (
            <AssignmentIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/student/assignments",
        },
        {
          text: "Apply Leaves",
          icon: (
            <FlightTakeoffIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/student/apply-leave",
        },
        {
          text: "Time Table",
          icon: (
            <CalendarMonthIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/student/time-table",
        },
        {
          text: "Exam List",
          icon: (
            <ExamListIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/student/exams",
        },
        {
          text: "Events",
          icon: (
            <EventsIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/student/events",
        },
      ];
    case 'parent':
      return [
        {
          text: "Dashboard",
          icon: (
            <DashboardIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/parent/dashboard",
        },
        {
          text: "Exam List",
          icon: (
            <ExamListIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/parent/exams",
        },
        {
          text: "Events/News",
          icon: (
            <EventsIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/parent/events",
        },
        {
          text: "Report Card",
          icon: (
            <ReportCardIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/parent/report-card",
        },
        {
          text: "Attendance",
          icon: (
            <PlaylistAddCheckIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/parent/attendance",
        },
        {
          text: "Time Table",
          icon: (
            <CalendarMonthIcon
              sx={{
                color: "black",
                transition: "color 0.3s ease",
              }}
            />
          ),
          path: "/parent/time-table",
        },
      ];
    case 'admin':
      return adminData;
    case 'superAdmin':
      return adminData
    default:
      return [];
  }
};


const userData = JSON.parse(localStorage.getItem("user_details"));

export const profileDetails1 = [
  {
    detailsTitle: "Name",
    detailsData: userData?.name,
  },
  {
    detailsTitle: "Email",
    detailsData: userData?.email,
  },
  {
    detailsTitle: " Mobile",
    detailsData: userData?.contact,
  },
];
export const profileDetails2 = [
  {
    detailsTitle: "Name",
    detailsData: userData?.name,
  },
  {
    detailsTitle: "Email",
    detailsData: userData?.email,
  },
  {
    detailsTitle: " Mobile",
    detailsData: userData?.contact,
  },
];

export const bloodGroupData = [
  { title: "O-" },
  { title: "O+" },
  { title: "A+" },
  { title: "A-" },
  { title: "B+" },
  { title: "B-" },
  { title: "AB-" },
  { title: "AB+" },
];