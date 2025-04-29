import './styles.css';

type WorkHistoryItemProps = {
  job: {
    _id: string;
    position: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  };
};

const WorkHistoryItem = ({ job }: WorkHistoryItemProps) => {
  return (
    <li className="work-history-item">
      <p className="font-semibold">{job.position} at {job.company}</p>
      <p className="text-sm text-gray-600">
        {job.startDate} - {job.endDate || "Present"}
      </p>
      <p className="text-sm">{job.description}</p>
    </li>
  );
};

export default WorkHistoryItem;
