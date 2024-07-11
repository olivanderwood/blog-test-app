import axios from 'axios';
import { IPost } from 'pages/post/type';
// import { AttendanceExportExcelQuery, TAttendanceDetail, TAttendanceDetailsRequest } from 'src/types/attendance';
// import { NameCardLinkQuery } from 'src/types/nameCardLink';

interface Error {
  message: string;
}

const BASE_URL = 'http://localhost:3000/posts/'

export const getListPostApi = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error: unknown) {
    const knowError = error as Error;
    throw knowError?.message;
  } finally {
  }
};

export const getDetailPostApi = async (id: string): Promise<IPost> => {
  try {
    const { data } = await axios.get(`${BASE_URL}${id}`);
    return data;
  } catch (error: unknown) {
    const knowError = error as Error;
    throw knowError?.message;
  }
};

export const updateDetailPostApi = async ({ id, ...reqData }: IPost) => {
  try {
    const { data } = await axios.patch(`${BASE_URL}${id}`, reqData);
    return data;
  } catch (error: unknown) {
    const knowError = error as Error;
    throw knowError?.message;
  }
}

export const createPostApi = async (reqData: IPost) => {
  try {
    const { data } = await axios.post(`${BASE_URL}`, reqData);
    return data;
  } catch (error: unknown) {
    const knowError = error as Error;
    throw knowError?.message;
  }
}

export const deletePostApi = async (id: string): Promise<void> => {
  try {
    const { data } = await axios.delete(`${BASE_URL}${id}`);
    return data;
  } catch (error: unknown) {
    const knowError = error as Error;
    throw knowError?.message;
  }
}


// export const getAttendanceDetailExportExcel = async ({ employeeId, ...query }: AttendanceExportExcelQuery, callback?: () => void) => {
//   try {
//     const { data, total } = await axios.get(`/dashboard/attendances/employee/${employeeId}/report`, query);
//     return { data, total };
//   } catch (error: unknown) {
//     message.error('Export failed. Please try again');
//     const knowError = error as Error;
//     throw knowError?.message;
//   } finally {
//     callback && callback();
//   }
// };

// export const getDetailAttendance = async ({ id, ...query }: TAttendanceDetailsRequest): Promise<{ data: TAttendanceDetail[]; total: number }> => {
//   try {
//     const { data, total } = await axios.get(`/dashboard/attendances/employees/${id}/working-day`, query);

//     return { data, total: total || 0 };
//   } catch (error: unknown) {
//     const knowError = error as Error;
//     throw knowError?.message;
//   }
// };
