import { CARD_BG } from '../../utils/data';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from 'moment';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  async function fetchAllSessions() {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (err) {
      console.error('Error fetching session data', err);
    }
  }
  async function deleteSession(sessionData) {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success('Session Deleted Successfully');
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (err) {
      console.error('Error deleting session data', err);
    }
  }

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4 xl:max-w-[80rem] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions.map((data, i) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[i % CARD_BG.length]}
              role={data?.role || ''}
              topicsToFocus={data?.topicsToFocus}
              experience={data?.experience || '-'}
              questions={data?.questions?.length || '-'}
              description={data?.description || ''}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format('DD MMM YYYY')
                  : ''
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
        <button
          className="h-10 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-3 py-1 md:px-7 md:py-2.5 rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors fixed bottom-8 sm:bottom-10 sm:right-10 md:bottom-20 right-5 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-xl md:text-2xl text-white" />
          Add New
        </button>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-[80vw] md:w-[50vw] lg:w-[40vw]">
          <DeleteAlertContent
            content="Are you sure want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
