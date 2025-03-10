import useAnnouncementByIdController from './useAnnouncementByIdController';

const AnnouncementById = () => {
  const { announcement, navigateBack } = useAnnouncementByIdController();

  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <div className="text-2xl text-center p-2 font-bold text-gray-800">
        {announcement?.name}
      </div>
      <p className="flex flex-col text-gray-700">
        <span className="font-semibold">รายละเอียดข่าวประชาสัมพันธ์</span>
        <span>{announcement?.description}</span>
      </p>
      {announcement?.docLink && (
        <>
          <object
            data={announcement.docLink}
            type="application/pdf"
            className="h-[600px] w-full bg-gray-100"
          >
            <p>
              Your browser does not support PDFs.{' '}
              {/* <a href={scholarship?.docLink}>Download the PDF</a>. */}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() =>
                  window.open(announcement.docLink ?? undefined, '_blank')
                }
              >
                ดาวน์โหลดเอกสารรายละเอียดข่าวประชาสัมพันธ์
              </button>
            </p>
          </object>
          <div className="flex flex-row gap-2">
            <a
              href={announcement.docLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-row justify-center items-center bg-[#dbe9ea] hover:bg-[#a9b3b3] text-black font-bold py-2 px-4 rounded-2xl"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9867 35.4166H27.0133C28.5604 35.4166 30.0442 34.8021 31.1381 33.7081C32.2321 32.6141 32.8467 31.1304 32.8467 29.5833V20.3666C32.8472 18.8197 32.2333 17.336 31.14 16.2416L21.1917 6.29165C20.6499 5.74998 20.0068 5.32033 19.2991 5.02721C18.5913 4.73409 17.8327 4.58326 17.0667 4.58331H12.9867C11.4396 4.58331 9.95583 5.19789 8.86186 6.29186C7.7679 7.38582 7.15332 8.86955 7.15332 10.4166V29.5833C7.15332 31.1304 7.7679 32.6141 8.86186 33.7081C9.95583 34.8021 11.4396 35.4166 12.9867 35.4166Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.395 11.9016C16.9966 12.0316 16.7416 12.295 16.6683 12.5867C16.5183 13.1733 16.6683 13.8033 17.09 14.5917C17.3 14.9817 17.5566 15.3766 17.84 15.8L17.9933 16.0283L18.235 16.3866L18.2666 16.2733L18.41 15.7633C18.5744 15.2044 18.7022 14.6378 18.7933 14.0633C18.9416 12.9933 18.775 12.3667 18.2783 11.9633C18.145 11.855 17.815 11.765 17.395 11.9016ZM17.4866 18.8216L17.0366 18.2183L16.9833 18.1383C16.7916 17.8217 16.5783 17.505 16.3466 17.1633L16.18 16.915C15.8733 16.4691 15.5885 16.0086 15.3266 15.535C14.81 14.5717 14.3966 13.3917 14.73 12.09C15.0133 10.9833 15.8933 10.2883 16.775 9.99998C17.6366 9.71998 18.7316 9.75498 19.5416 10.4117C20.8616 11.485 20.955 13.0333 20.7733 14.34C20.6721 15.0012 20.5268 15.6549 20.3383 16.2966L20.1783 16.8633C20.0539 17.2878 19.9383 17.715 19.8316 18.145L19.72 18.4683L22.04 21.575C23.1233 21.445 24.3133 21.3666 25.4233 21.4466C26.705 21.5366 28.0816 21.85 29.02 22.74C29.3219 23.0533 29.5404 23.4373 29.6554 23.8569C29.7704 24.2765 29.7783 24.7182 29.6783 25.1416C29.4833 25.9417 28.9216 26.6083 28.1466 27.0133C26.505 27.8716 24.9766 27.1883 23.8416 26.32C22.9533 25.6416 22.1 24.695 21.3816 23.8983L21.2083 23.7083C20.5916 23.8033 20.0083 23.91 19.535 24C19.0266 24.095 18.395 24.2133 17.7083 24.3666L17.4566 25.105C17.3177 25.425 17.1855 25.7472 17.06 26.0716L16.8566 26.5766C16.6514 27.0966 16.4137 27.6032 16.145 28.0933C15.595 29.0567 14.7166 30.08 13.2433 30.1616C11.27 30.2717 9.9333 28.52 10.3166 26.6483L10.3266 26.6033C10.66 25.285 11.8166 24.42 12.935 23.8483C13.93 23.3383 15.0916 22.9616 16.17 22.68L17.4866 18.8216ZM18.9366 20.7633L18.4583 22.1683L19.16 22.035L19.1666 22.0333L19.8 21.9166L18.9366 20.7633ZM23.67 23.4367C24.1266 23.92 24.5816 24.37 25.055 24.7316C25.9716 25.4316 26.6216 25.5533 27.22 25.24C27.5533 25.065 27.6933 24.8383 27.735 24.67C27.7552 24.5797 27.7536 24.4859 27.7304 24.3964C27.7072 24.3069 27.6631 24.2241 27.6016 24.155C27.1733 23.775 26.3983 23.5216 25.2816 23.4416C24.745 23.4075 24.2068 23.4058 23.67 23.4367ZM15.3283 25.015C14.7983 25.1966 14.295 25.3983 13.845 25.6283C12.8666 26.1283 12.395 26.635 12.2716 27.0733C12.1416 27.765 12.5916 28.195 13.1316 28.165C13.5816 28.14 13.975 27.8583 14.4083 27.1C14.635 26.6866 14.8339 26.2605 15.005 25.8216L15.1833 25.3783L15.3283 25.015Z"
                  fill="black"
                />
              </svg>
              เอกสารรายละเอียด
            </a>
          </div>
        </>
      )}
      <div className="flex justify-end">
        <button
          type="button"
          className=" text-black font-bold border border-solid border-black py-4 px-6 rounded-2xl cursor-pointer"
          onClick={navigateBack}
        >
          กลับหน้าข่าวประชาสัมพันธ์ทั้งหมด
        </button>
      </div>
    </div>
  );
};

export default AnnouncementById;
