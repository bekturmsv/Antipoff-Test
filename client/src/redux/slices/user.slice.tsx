import axiosBaseUrl from "../../axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  email: string;
  info: string;
  avatar: string;
}

interface UsersState {
  items: User[];
  status: "loading" | "loaded" | "error";
  selectedUser: User | null;
}

const initialState: UsersState = {
  items: [],
  status: "loading",
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axiosBaseUrl.get("/api/user/users");

  return data;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: string) => {
    const { data } = await axiosBaseUrl.get<User>(`api/users/${id}`);
    return data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        (state.status = "loading"), (state.items = []);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        (state.status = "loaded"), (state.items = action.payload);
      })
      .addCase(fetchUsers.rejected, (state) => {
        (state.status = "error"), (state.items = []);
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
        state.selectedUser = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "loaded";
          state.selectedUser = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state) => {
        state.status = "error";
        state.selectedUser = null;
      });
  },
});
export const userReducer = userSlice.reducer;
