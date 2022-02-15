import React from "react";

import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// 액션 타입을 정해줍니다.
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";
const LOADED = "bucket/LOADED";

// 초기 상태값을 만들어줍니다.
const initialState = {
  is_loaded: false,
  list: [
    { text: "영화관 가기", completed: false },
    { text: "매일 책읽기", completed: false },
    { text: "수영 배우기", completed: false },
    { text: "코딩하기", completed: false },
  ],

  // list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
};

// 액션 생성 함수예요.
// 액션을 만들어줄 함수죠!

export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}

export function createBucket(bucket) {
  return { type: CREATE, bucket };
}

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

// middlewares
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));

    let bucket_list = [];
    bucket_data.forEach((doc) => {
      bucket_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    dispatch(isLoaded(true));
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    const bucket_data = { id: docRef.id, ...bucket };

    dispatch(createBucket(bucket_data));
    // console.log((await getDoc(docRef)).data());
  };
};

export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, { completed: true });

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(updateBucket(bucket_index));
  };
};

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("아이디가 없네요");
      return;
    }
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(deleteBucket(bucket_index));
  };
};

// 리듀서예요.
// 실질적으로 store에 들어가 있는 데이터를 변경하는 곳이죠!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list, is_loaded: true };
    }

    case "bucket/CREATE":
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list };

    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { ...state, list: new_bucket_list };
    }
    case "bucket/UPDATE": {
      const new_bucket_list = state.list.map((l, idx) => {
        if (parseInt(action.bucket_index) === idx) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });

      return { ...state, list: new_bucket_list };
    }

    case "bucket/LOADED": {
      return { ...state, is_loaded: action.loaded };
    }
    default:
      return state;
  }
}
