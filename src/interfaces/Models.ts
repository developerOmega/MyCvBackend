
// Interfaz para Modelo padre
interface ModelData {
  id:number,
  updated_at: string,
  created_at:string
}

// Interfaz para Admins
interface AdminData {
  name:string,
  email:string,
  password:string
}

// Interfaz para Users
interface UserData {
  first_name:string,
  last_name:string,
  email:string,
  password:string,
  img:string,
  main_img:string,
  description:string
}

// Interfaz para Jobs
interface JobData {
  company:string,
  init:Date,
  finish: Date,
  description:string,
  user_id:number
}

// Interfaz para Skills
interface SkillData{
  name:string,
  icon:string,
  admin_id:number
}

// Interfaz para Projects
interface ProjectData{
  title:string,
  link:string,
  description:string,
  user_id:number
}

// Interfaz para Sections
interface SectionData{
  content:string,
  img:string,
  project_id:number
}

// Interfaz para pivote de Users y Skills
interface UserSkillData{
  user_id:number,
  skill_id:number
}

// Interfaz para pivote de Projects y Skills
interface ProjectSkillData{
  project_id:number,
  skill_id:number
}

export { ModelData,  AdminData, UserData, JobData, SkillData, ProjectData, SectionData, UserSkillData, ProjectSkillData};