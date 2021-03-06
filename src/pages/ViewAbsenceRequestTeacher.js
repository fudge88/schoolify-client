import { PageContainer } from "../components/PageContainer";
import { TeachersAbsenceRequestsTable } from "../components/TeachersAbsenceRequestsTable";

export const ViewAbsenceRequestTeacher = () => {
  return (
    <PageContainer maxWidth="lg">
      <TeachersAbsenceRequestsTable />
    </PageContainer>
  );
};
