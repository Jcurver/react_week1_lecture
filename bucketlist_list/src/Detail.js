//Detail.js
// 리액트 패키지를 불러옵니다.
import React from "react";
// 라우터 훅을 불러옵니다.
import { useParams, useHistory } from "react-router-dom";
// redux hook을 불러옵니다.
import { deleteBucketFB, updateBucketFB } from "./redux/modules/bucket";
import { useSelector, useDispatch } from "react-redux";

import Button from '@material-ui/core/Button';

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // 스토어에서 상태값 가져오기

  // url 파라미터에서 인덱스 가져오기
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);


  return (
    <div>
      <h1>{bucket_list[bucket_index] ? bucket_list[bucket_index].text : ""}</h1>
      <Button variant="outlined" color="primary"
        onClick={() => {
          // dispatch(updateBucket(bucket_index));
          dispatch(updateBucketFB(bucket_list[bucket_index].id));
        }}
      >
        완료하기
      </Button>
      <Button 
      variant="outlined" color="secondary"
        onClick={() => {

          dispatch(deleteBucketFB(bucket_list[bucket_index].id));
          history.goBack();
        }}
      >
        삭제하기
      </Button>
    </div>
  );
};

export default Detail;
