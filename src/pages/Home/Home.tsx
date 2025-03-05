import useHomeController from './useHomeController';

const Home = () => {
  const { token, announcements } = useHomeController();
  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="flex flex-row gap-2 w-full my-4 text-xl">
        <span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.49776 17.1329V11.9245H11.6644V17.1329C11.6644 17.7058 12.1332 18.1745 12.7061 18.1745H15.8311C16.404 18.1745 16.8728 17.7058 16.8728 17.1329V9.84119H18.6436C19.1228 9.84119 19.3519 9.24744 18.9873 8.93494L10.279 1.09119C9.88318 0.73702 9.27901 0.73702 8.88318 1.09119L0.174846 8.93494C-0.179321 9.24744 0.0394291 9.84119 0.518596 9.84119H2.28943V17.1329C2.28943 17.7058 2.75818 18.1745 3.3311 18.1745H6.4561C7.02901 18.1745 7.49776 17.7058 7.49776 17.1329Z" />
          </svg>
        </span>
        <span>หน้าหลัก</span>
      </div>
      {token
        ? 'ยินดีต้อนรับ'
        : 'ยินดีต้อนรับ! กรุณาเข้าสู่ระบบก่อนดำเนินการสมัครทุน'}
      <div className="h-60 w-full flex flex-col p-5 shadow-full-2xl rounded-2xl">
        <div className="text-lg">ข่าวประชาสัมพันธ์</div>
        <div className="flex flex-col h-full w-full overflow-y-auto">
          {announcements.map((announcement, index) => (
            <div key={index} className="flex flex-col p-4 gap-2">
              <div className="text-lg font-bold">{announcement.name}</div>
              <div>{announcement.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
