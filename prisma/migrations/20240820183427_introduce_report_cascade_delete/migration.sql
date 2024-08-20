-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_schoolId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
