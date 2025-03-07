import { ReactNode, useEffect, useState } from 'react';
import {
  PathInfo,
  RolesBaseAccessContext,
} from '../contexts/RolesBaseAccessContext';
import { useAuth } from '../hooks/useAuth';
import { Path } from '../constants/Path';
import { Role } from '../types/Roles';

const basePaths: PathInfo[] = [
  {
    label: 'หน้าแรก',
    link: Path.HOME,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 20 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.49776 17.1329V11.9245H11.6644V17.1329C11.6644 17.7058 12.1332 18.1745 12.7061 18.1745H15.8311C16.404 18.1745 16.8728 17.7058 16.8728 17.1329V9.84119H18.6436C19.1228 9.84119 19.3519 9.24744 18.9873 8.93494L10.279 1.09119C9.88318 0.73702 9.27901 0.73702 8.88318 1.09119L0.174846 8.93494C-0.179321 9.24744 0.0394291 9.84119 0.518596 9.84119H2.28943V17.1329C2.28943 17.7058 2.75818 18.1745 3.3311 18.1745H6.4561C7.02901 18.1745 7.49776 17.7058 7.49776 17.1329Z" />
      </svg>
    ),
  },
  {
    label: 'ทุนทั้งหมด',
    link: Path.SCHOLARSHIP,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 60 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M28.8487 0.997501C29.2108 0.835062 29.6031 0.751083 30 0.751083C30.3968 0.751083 30.7892 0.835062 31.1512 0.997501L58.3387 13.185C58.8329 13.4073 59.2524 13.7676 59.5467 14.2227C59.841 14.6777 59.9976 15.2081 59.9976 15.75C59.9976 16.2919 59.841 16.8223 59.5467 17.2773C59.2524 17.7324 58.8329 18.0927 58.3387 18.315L48.75 22.6163V33.0938C48.75 36.9338 45.7125 39.6525 42.525 41.2425C39.1762 42.9188 34.7437 43.875 30 43.875C28.9575 43.875 27.9375 43.83 26.94 43.74C26.2031 43.6662 25.5251 43.3047 25.0531 42.7341C24.5811 42.1635 24.3532 41.4297 24.4189 40.6921C24.4846 39.9545 24.8385 39.2725 25.4039 38.7943C25.9692 38.316 26.7004 38.08 27.4387 38.1375C28.2687 38.2125 29.1225 38.25 30 38.25C34.0575 38.25 37.5937 37.4212 40.0125 36.2137C42.6 34.92 43.125 33.6562 43.125 33.0938V25.1363L31.1512 30.5025C30.7892 30.6649 30.3968 30.7489 30 30.7489C29.6031 30.7489 29.2108 30.6649 28.8487 30.5025L15 24.3V30.5362C16.11 30.93 17.1562 31.5675 18.045 32.4562C19.6875 34.0988 20.625 36.4275 20.625 39.1912V50.4412C20.625 51.1872 20.3287 51.9025 19.8012 52.43C19.2738 52.9574 18.5584 53.2537 17.8125 53.2537H6.56247C5.81655 53.2537 5.10118 52.9574 4.57373 52.43C4.04629 51.9025 3.74997 51.1872 3.74997 50.4412V39.1912C3.74997 36.4275 4.68747 34.0988 6.32997 32.4562C7.21872 31.5675 8.26497 30.93 9.37497 30.5362V21.7725L1.66122 18.315C1.167 18.0927 0.747513 17.7324 0.453226 17.2773C0.158939 16.8223 0.00238037 16.2919 0.00238037 15.75C0.00238037 15.2081 0.158939 14.6777 0.453226 14.2227C0.747513 13.7676 1.167 13.4073 1.66122 13.185L28.8487 0.997501ZM9.68622 15.75L30 24.855L50.31 15.75L30 6.645L9.68622 15.75ZM9.37497 39.1875V47.625H15V39.1875C15 37.7325 14.5312 36.8963 14.0625 36.4313C13.8159 36.1866 13.5231 35.9934 13.2013 35.8627C12.8794 35.732 12.5348 35.6665 12.1875 35.67C11.8401 35.6665 11.4955 35.732 11.1737 35.8627C10.8518 35.9934 10.5591 36.1866 10.3125 36.4313C9.84372 36.8963 9.37497 37.7325 9.37497 39.1875Z" />
      </svg>
    ),
  },
  {
    label: 'ข่าวประชาสัมพันธ์',
    link: Path.ANNOUNCEMENT,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.46875 7.8125C5.26155 7.8125 5.06284 7.89481 4.91632 8.04132C4.76981 8.18784 4.6875 8.38655 4.6875 8.59375C4.6875 8.80095 4.76981 8.99966 4.91632 9.14618C5.06284 9.29269 5.26155 9.375 5.46875 9.375H16.4062C16.6135 9.375 16.8122 9.29269 16.9587 9.14618C17.1052 8.99966 17.1875 8.80095 17.1875 8.59375C17.1875 8.38655 17.1052 8.18784 16.9587 8.04132C16.8122 7.89481 16.6135 7.8125 16.4062 7.8125H5.46875ZM5.46875 10.9375C5.26155 10.9375 5.06284 11.0198 4.91632 11.1663C4.76981 11.3128 4.6875 11.5115 4.6875 11.7188V14.8438C4.6875 15.051 4.76981 15.2497 4.91632 15.3962C5.06284 15.5427 5.26155 15.625 5.46875 15.625H8.59375C8.80095 15.625 8.99966 15.5427 9.14618 15.3962C9.29269 15.2497 9.375 15.051 9.375 14.8438V11.7188C9.375 11.5115 9.29269 11.3128 9.14618 11.1663C8.99966 11.0198 8.80095 10.9375 8.59375 10.9375H5.46875ZM6.25 14.0625V12.5H7.8125V14.0625H6.25ZM11.7188 10.9375C11.5115 10.9375 11.3128 11.0198 11.1663 11.1663C11.0198 11.3128 10.9375 11.5115 10.9375 11.7188C10.9375 11.926 11.0198 12.1247 11.1663 12.2712C11.3128 12.4177 11.5115 12.5 11.7188 12.5H16.4062C16.6135 12.5 16.8122 12.4177 16.9587 12.2712C17.1052 12.1247 17.1875 11.926 17.1875 11.7188C17.1875 11.5115 17.1052 11.3128 16.9587 11.1663C16.8122 11.0198 16.6135 10.9375 16.4062 10.9375H11.7188ZM11.7188 14.0625C11.5115 14.0625 11.3128 14.1448 11.1663 14.2913C11.0198 14.4378 10.9375 14.6365 10.9375 14.8438C10.9375 15.051 11.0198 15.2497 11.1663 15.3962C11.3128 15.5427 11.5115 15.625 11.7188 15.625H16.4062C16.6135 15.625 16.8122 15.5427 16.9587 15.3962C17.1052 15.2497 17.1875 15.051 17.1875 14.8438C17.1875 14.6365 17.1052 14.4378 16.9587 14.2913C16.8122 14.1448 16.6135 14.0625 16.4062 14.0625H11.7188ZM1.5625 6.25C1.5625 5.4212 1.89174 4.62634 2.47779 4.04029C3.06384 3.45424 3.8587 3.125 4.6875 3.125H17.1875C18.0163 3.125 18.8112 3.45424 19.3972 4.04029C19.9833 4.62634 20.3125 5.4212 20.3125 6.25C21.1413 6.25 21.9362 6.57924 22.5222 7.16529C23.1083 7.75134 23.4375 8.5462 23.4375 9.375V16.4062C23.4375 17.4423 23.0259 18.4358 22.2934 19.1684C21.5608 19.9009 20.5673 20.3125 19.5312 20.3125H5.46875C4.43275 20.3125 3.43918 19.9009 2.70661 19.1684C1.97405 18.4358 1.5625 17.4423 1.5625 16.4062V6.25ZM19.5312 16.4062C19.324 16.4062 19.1253 16.3239 18.9788 16.1774C18.8323 16.0309 18.75 15.8322 18.75 15.625V6.25C18.75 5.8356 18.5854 5.43817 18.2924 5.14515C17.9993 4.85212 17.6019 4.6875 17.1875 4.6875H4.6875C4.2731 4.6875 3.87567 4.85212 3.58265 5.14515C3.28962 5.43817 3.125 5.8356 3.125 6.25V16.4062C3.125 17.0279 3.37193 17.624 3.81147 18.0635C4.25101 18.5031 4.84715 18.75 5.46875 18.75H19.5312C20.1529 18.75 20.749 18.5031 21.1885 18.0635C21.6281 17.624 21.875 17.0279 21.875 16.4062V9.375C21.875 8.9606 21.7104 8.56317 21.4174 8.27015C21.1243 7.97712 20.7269 7.8125 20.3125 7.8125V15.625C20.3125 15.8322 20.2302 16.0309 20.0837 16.1774C19.9372 16.3239 19.7385 16.4062 19.5312 16.4062Z" />
      </svg>
    ),
  },
];

const loggedInPaths: PathInfo[] = [
  {
    label: 'ออกจากระบบ',
    link: Path.SIGNOUT,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.7083 7.29167L16.2395 8.76042L18.927 11.4583H8.33325V13.5417H18.927L16.2395 16.2292L17.7083 17.7083L22.9166 12.5M4.16659 5.20833H12.4999V3.125H4.16659C3.02075 3.125 2.08325 4.0625 2.08325 5.20833V19.7917C2.08325 20.9375 3.02075 21.875 4.16659 21.875H12.4999V19.7917H4.16659V5.20833Z" />
      </svg>
    ),
  },
];

const studentPaths: PathInfo[] = [
  {
    label: 'สมัครทุน',
    link: Path.APPLY,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.4062 13.5417C16.4062 13.3345 16.3239 13.1358 16.1774 12.9893C16.0309 12.8428 15.8322 12.7605 15.625 12.7605H9.375C9.1678 12.7605 8.96909 12.8428 8.82257 12.9893C8.67606 13.1358 8.59375 13.3345 8.59375 13.5417C8.59375 13.7489 8.67606 13.9477 8.82257 14.0942C8.96909 14.2407 9.1678 14.323 9.375 14.323H15.625C15.8322 14.323 16.0309 14.2407 16.1774 14.0942C16.3239 13.9477 16.4062 13.7489 16.4062 13.5417ZM16.4062 17.7084C16.4062 17.5012 16.3239 17.3025 16.1774 17.156C16.0309 17.0095 15.8322 16.9272 15.625 16.9272H9.375C9.1678 16.9272 8.96909 17.0095 8.82257 17.156C8.67606 17.3025 8.59375 17.5012 8.59375 17.7084C8.59375 17.9156 8.67606 18.1143 8.82257 18.2608C8.96909 18.4074 9.1678 18.4897 9.375 18.4897H15.625C15.8322 18.4897 16.0309 18.4074 16.1774 18.2608C16.3239 18.1143 16.4062 17.9156 16.4062 17.7084Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.29159 2.34375C6.53185 2.34375 5.80323 2.64555 5.26602 3.18277C4.72881 3.71998 4.427 4.4486 4.427 5.20833V19.7917C4.427 20.5514 4.72881 21.28 5.26602 21.8172C5.80323 22.3544 6.53185 22.6562 7.29159 22.6562H17.7083C18.468 22.6562 19.1966 22.3544 19.7338 21.8172C20.271 21.28 20.5728 20.5514 20.5728 19.7917V8.3C20.5728 7.90312 20.4437 7.51771 20.2041 7.20104L17.0812 3.06771C16.9113 2.84283 16.6915 2.66042 16.4392 2.5348C16.1869 2.40918 15.9089 2.34379 15.627 2.34375H7.29159ZM5.9895 5.20833C5.9895 4.48958 6.57284 3.90625 7.29159 3.90625H14.8437V8.48646C14.8437 8.91771 15.1937 9.26771 15.6249 9.26771H19.0103V19.7917C19.0103 20.5104 18.427 21.0938 17.7083 21.0938H7.29159C6.57284 21.0938 5.9895 20.5104 5.9895 19.7917V5.20833Z"
        />
      </svg>
    ),
  },
  {
    label: 'ตรวจสอบสถานะ',
    link: Path.STATUS,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.1874 11.4584L13.5416 7.81258L14.9999 6.35425L17.1874 8.54175L21.5624 4.16675L23.0208 5.62508L17.1874 11.4584ZM11.4583 7.29175H2.08325V9.37508H11.4583V7.29175ZM21.8749 13.9584L20.4166 12.5001L17.7083 15.2084L14.9999 12.5001L13.5416 13.9584L16.2499 16.6667L13.5416 19.3751L14.9999 20.8334L17.7083 18.1251L20.4166 20.8334L21.8749 19.3751L19.1666 16.6667L21.8749 13.9584ZM11.4583 15.6251H2.08325V17.7084H11.4583V15.6251Z" />
      </svg>
    ),
  },
  {
    label: 'ประวัติการสมัคร',
    link: Path.HISTORY,
    icon: (
      <svg
        width="23"
        height="23"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 513.11"
      >
        <path
          fillRule="nonzero"
          d="M210.48 160.8c0-14.61 11.84-26.46 26.45-26.46s26.45 11.85 26.45 26.46v110.88l73.34 32.24c13.36 5.88 19.42 21.47 13.54 34.82-5.88 13.35-21.47 19.41-34.82 13.54l-87.8-38.6c-10.03-3.76-17.16-13.43-17.16-24.77V160.8zM5.4 168.54c-.76-2.25-1.23-4.64-1.36-7.13l-4-73.49c-.75-14.55 10.45-26.95 25-27.69 14.55-.75 26.95 10.45 27.69 25l.74 13.6a254.258 254.258 0 0136.81-38.32c17.97-15.16 38.38-28.09 61.01-38.18 64.67-28.85 134.85-28.78 196.02-5.35 60.55 23.2 112.36 69.27 141.4 132.83.77 1.38 1.42 2.84 1.94 4.36 27.86 64.06 27.53 133.33 4.37 193.81-23.2 60.55-69.27 112.36-132.83 141.39a26.24 26.24 0 01-12.89 3.35c-14.61 0-26.45-11.84-26.45-26.45 0-11.5 7.34-21.28 17.59-24.92 7.69-3.53 15.06-7.47 22.09-11.8.8-.66 1.65-1.28 2.55-1.86 11.33-7.32 22.1-15.7 31.84-25.04.64-.61 1.31-1.19 2-1.72 20.66-20.5 36.48-45.06 46.71-71.76 18.66-48.7 18.77-104.46-4.1-155.72l-.01-.03C418.65 122.16 377.13 85 328.5 66.37c-48.7-18.65-104.46-18.76-155.72 4.1a203.616 203.616 0 00-48.4 30.33c-9.86 8.32-18.8 17.46-26.75 27.29l3.45-.43c14.49-1.77 27.68 8.55 29.45 23.04 1.77 14.49-8.55 27.68-23.04 29.45l-73.06 9c-13.66 1.66-26.16-7.41-29.03-20.61zM283.49 511.5c20.88-2.34 30.84-26.93 17.46-43.16-5.71-6.93-14.39-10.34-23.29-9.42-15.56 1.75-31.13 1.72-46.68-.13-9.34-1.11-18.45 2.72-24.19 10.17-12.36 16.43-2.55 39.77 17.82 42.35 19.58 2.34 39.28 2.39 58.88.19zm-168.74-40.67c7.92 5.26 17.77 5.86 26.32 1.74 18.29-9.06 19.97-34.41 3.01-45.76-12.81-8.45-25.14-18.96-35.61-30.16-9.58-10.2-25.28-11.25-36.11-2.39a26.436 26.436 0 00-2.55 38.5c13.34 14.2 28.66 27.34 44.94 38.07zM10.93 331.97c2.92 9.44 10.72 16.32 20.41 18.18 19.54 3.63 36.01-14.84 30.13-33.82-4.66-15-7.49-30.26-8.64-45.93-1.36-18.33-20.21-29.62-37.06-22.33C5.5 252.72-.69 262.86.06 274.14c1.42 19.66 5.02 39 10.87 57.83z"
        />
      </svg>
    ),
  },
  {
    label: 'แก้ไขข้อมูลส่วนตัว',
    link: Path.PROFILE,
    icon: (
      <svg
        height="23"
        width="23"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 472.615 472.615"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <circle cx="236.308" cy="117.504" r="111.537" />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M369,246.306c-1.759-1.195-5.297-3.493-5.297-3.493c-28.511,39.583-74.993,65.402-127.395,65.402
			c-52.407,0-98.894-25.825-127.404-65.416c0,0-2.974,1.947-4.451,2.942C41.444,288.182,0,360.187,0,441.87v24.779h472.615V441.87
			C472.615,360.549,431.538,288.822,369,246.306z"
            />
          </g>
        </g>
      </svg>
    ),
  },
];

const advisorPaths: PathInfo[] = [];

const adminPaths: PathInfo[] = [
  {
    label: 'พิจารณาทุน',
    link: Path.CONSIDER,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 26 26"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.5833 18.4166V20.5833H7.58325V18.4166C7.58325 18.4166 7.58325 14.0833 14.0833 14.0833C20.5833 14.0833 20.5833 18.4166 20.5833 18.4166ZM17.3333 8.66663C17.3333 8.02384 17.1426 7.39548 16.7855 6.86102C16.4284 6.32656 15.9208 5.91 15.327 5.66402C14.7331 5.41803 14.0796 5.35367 13.4492 5.47908C12.8188 5.60448 12.2397 5.91401 11.7852 6.36853C11.3306 6.82305 11.0211 7.40215 10.8957 8.03258C10.7703 8.66302 10.8347 9.31649 11.0806 9.91035C11.3266 10.5042 11.7432 11.0118 12.2776 11.3689C12.8121 11.726 13.4405 11.9166 14.0833 11.9166C14.9452 11.9166 15.7719 11.5742 16.3813 10.9647C16.9908 10.3552 17.3333 9.52858 17.3333 8.66663ZM20.7999 14.1483C21.3921 14.6946 21.8695 15.3534 22.2043 16.0863C22.5391 16.8191 22.7246 17.6113 22.7499 18.4166V20.5833H25.9999V18.4166C25.9999 18.4166 25.9999 14.6791 20.7999 14.1483ZM19.4999 5.41663C19.1726 5.41665 18.8473 5.46782 18.5358 5.56829C19.1696 6.47718 19.5094 7.55858 19.5094 8.66663C19.5094 9.77468 19.1696 10.8561 18.5358 11.765C18.8473 11.8654 19.1726 11.9166 19.4999 11.9166C20.3619 11.9166 21.1885 11.5742 21.798 10.9647C22.4075 10.3552 22.7499 9.52858 22.7499 8.66663C22.7499 7.80467 22.4075 6.97802 21.798 6.36853C21.1885 5.75904 20.3619 5.41663 19.4999 5.41663ZM7.95158 9.66329L9.20825 11.1908L4.06242 16.3366L1.08325 13.0866L2.33992 11.83L4.06242 13.5416L7.95158 9.66329Z" />
      </svg>
    ),
  },
  {
    label: 'ผู้ได้รับทุน',
    link: Path.RECIPIENT,
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M25 5C36.0275 5 45 13.9725 45 25C45 36.0275 36.0275 45 25 45C13.9725 45 5 36.0275 5 25C5 13.9725 13.9725 5 25 5ZM25 0C11.1925 0 0 11.1925 0 25C0 38.8075 11.1925 50 25 50C38.8075 50 50 38.8075 50 25C50 11.1925 38.8075 0 25 0ZM13.875 27.5C13.8275 27.915 13.75 28.3225 13.75 28.75C13.75 31.7337 14.9353 34.5952 17.045 36.7049C19.1548 38.8147 22.0163 40 25 40C27.9837 40 30.8452 38.8147 32.9549 36.7049C35.0647 34.5952 36.25 31.7337 36.25 28.75C36.25 28.3225 36.17 27.915 36.125 27.5H13.875ZM20 20V15C20 14.337 19.7366 13.7011 19.2678 13.2322C18.7989 12.7634 18.163 12.5 17.5 12.5C16.837 12.5 16.2011 12.7634 15.7322 13.2322C15.2634 13.7011 15 14.337 15 15V20C15 20.663 15.2634 21.2989 15.7322 21.7678C16.2011 22.2366 16.837 22.5 17.5 22.5C18.163 22.5 18.7989 22.2366 19.2678 21.7678C19.7366 21.2989 20 20.663 20 20ZM35 20V15C35 14.337 34.7366 13.7011 34.2678 13.2322C33.7989 12.7634 33.163 12.5 32.5 12.5C31.837 12.5 31.2011 12.7634 30.7322 13.2322C30.2634 13.7011 30 14.337 30 15V20C30 20.663 30.2634 21.2989 30.7322 21.7678C31.2011 22.2366 31.837 22.5 32.5 22.5C33.163 22.5 33.7989 22.2366 34.2678 21.7678C34.7366 21.2989 35 20.663 35 20Z" />
      </svg>
    ),
  },
  {
    label: 'ประวัติผู้ได้รับทุน',
    link: Path.RECIPIENT_HISTORY,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="25"
        height="25"
      >
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
      </svg>
    ),
  },
];

const RolesBaseAccessProvider = ({ children }: { children: ReactNode }) => {
  const { token, roles } = useAuth();
  const [accessibles, setAccessibles] = useState<PathInfo[]>([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (!token || roles.length === 0) {
      setAccessibles([...basePaths]);
    } else {
      const allowedPaths: PathInfo[] = [];
      if (roles.includes(Role.STUDENT)) {
        allowedPaths.push(...studentPaths);
      }
      if (roles.includes(Role.ADVISOR)) {
        allowedPaths.push(...advisorPaths);
      }
      if (roles.includes(Role.ADMIN)) {
        allowedPaths.push(...adminPaths);
      }
      setAccessibles([...basePaths, ...allowedPaths, ...loggedInPaths]);
    }
  }, [token, roles]);

  return (
    <RolesBaseAccessContext.Provider
      value={{
        accessibles,
        isSideBarOpen,
        setIsSideBarOpen,
        isProfileMenuOpen,
        setIsProfileMenuOpen,
      }}
    >
      {children}
    </RolesBaseAccessContext.Provider>
  );
};

export default RolesBaseAccessProvider;
