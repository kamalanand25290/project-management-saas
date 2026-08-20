import express from "express";
import prisma from "./lib/prisma";

import authRoutes from "./modules/auth/auth.routes";
import workspaceRoutes from "./modules/workspace/workspace.route";
import projectRoutes from "./modules/project/project.route";
import taskRoutes from "./modules/task/task.route";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workspace", workspaceRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("/", async (req, res) => {
  const user = await prisma.user.findUnique({
    where:{
        email: 'kamal@mern.com',
    }
  });

  res.json({
    message: "PMS Backend is running 🚀",
    userName: user?.name || "No user found",
  });
});

export default app;