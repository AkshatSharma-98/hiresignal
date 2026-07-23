/*
  Warnings:

  - Added the required column `sourcePlatform` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceUrl` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SourcePlatform" AS ENUM ('linkedin', 'seek', 'indeed', 'company_site', 'other');

-- CreateEnum
CREATE TYPE "WorkArrangement" AS ENUM ('remote', 'hybrid', 'onsite');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('full_time', 'part_time', 'contract', 'internship', 'casual');

-- CreateEnum
CREATE TYPE "SeniorityLevel" AS ENUM ('entry', 'associate', 'mid_senior', 'director', 'executive');

-- CreateEnum
CREATE TYPE "SalaryPeriod" AS ENUM ('yearly', 'hourly', 'monthly');

-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "applicantCount" INTEGER,
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "employmentType" "EmploymentType",
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "postedAt" TIMESTAMP(3),
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "salaryCurrency" TEXT,
ADD COLUMN     "salaryMax" DOUBLE PRECISION,
ADD COLUMN     "salaryMin" DOUBLE PRECISION,
ADD COLUMN     "salaryPeriod" "SalaryPeriod",
ADD COLUMN     "seniorityLevel" "SeniorityLevel",
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "sourcePlatform" "SourcePlatform" NOT NULL,
ADD COLUMN     "sourceUrl" TEXT NOT NULL,
ADD COLUMN     "workArrangement" "WorkArrangement";
