const express = require("express");
const app = express()
const cors = require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors())
const DBconnection = require("./src/utils/DBConnection");
DBconnection();

const userRoutes = require("./src/routes/UserRoutes");
const hackathonRoutes = require("./src/routes/HackathonRoutes");
const problemRoutes = require("./src/routes/ProblemRoutes");
const resultRoutes = require("./src/routes/ResultRoutes");
const teamRoutes = require("./src/routes/TeamRoutes");
const teamMemberRoutes = require("./src/routes/TeamMemberRoutes");
const registrationRoutes = require("./src/routes/RegistrationRoutes");
const submissionRoutes = require("./src/routes/SubmissionRoutes");
const evaluationRoutes = require("./src/routes/EvaluationRoutes");
const certificateRoutes = require("./src/routes/CertificateRoutes");
const notificationRoutes = require("./src/routes/NotificationRoutes")
const dashboardRoutes = require("./src/routes/DashBoardRoutes")
app.use("/user",userRoutes)
app.use("/hackathons", hackathonRoutes);
app.use("/problems", problemRoutes);
app.use("/results", resultRoutes);
app.use("/teams", teamRoutes);
app.use("/team-members", teamMemberRoutes);
app.use("/registrations", registrationRoutes);
app.use("/submissions", submissionRoutes);
app.use("/evaluations", evaluationRoutes);
app.use("/certificates", certificateRoutes);
app.use("/notifications", notificationRoutes);
app.use("/dashboard", dashboardRoutes);
const port  = process.env.PORT

app.listen(port,()=>{
    console.log(`server stated on port ${port}`)


})