import { Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as S from "./styles";
import EditIcon from "@mui/icons-material/Edit";
import Images from "../../assets";
import { profileDetails2, profileDetails1 } from "../../utils/constant";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("user_details"));
  return (
    <div>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent
          sx={{
            backgroundColor: "#F5F5F8",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ display: "flex", gap: 3 }}>
            <Typography>
              <img src={Images?.userLogo} alt="" className="profileImg" />
            </Typography>
            <div>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {userData?.name}
              </Typography>
              <Typography sx={{ color: "#838383" }}>
                {userData?.role}
              </Typography>
            </div>
          </Typography>
          <Typography>
            <Link to="/dashboard/editProfile">
              <Button variant="contained" sx={{ display: "flex", gap: 1 }}>
                <EditIcon />
                Edit
              </Button>
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography gutterBottom variant="h5" component="div">
            Personal Details
          </Typography>
          <Typography
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 10,
            }}
          >
            <Typography sx={{ pl: 5, pt: 2 }}>
              {profileDetails1?.map((item, index) => (
                <S.flexMain key={index}>
                  <Typography component="div" sx={{ color: "#838383" }}>
                    {item?.detailsTitle}
                  </Typography>
                  <Typography component="div">{item?.detailsData}</Typography>
                </S.flexMain>
              ))}
            </Typography>
            <Typography>
              {profileDetails2?.map((item, index) => (
                <S.flexMain key={index}>
                  <Typography component="div" sx={{ color: "#838383" }}>
                    {item?.detailsTitle}
                  </Typography>
                  <Typography component="div">{item?.detailsData}</Typography>
                </S.flexMain>
              ))}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default ProfilePage;
