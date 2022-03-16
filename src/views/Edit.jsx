import { useNavigate, useSearchParams } from 'react-router-dom';

function Edit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigater = useNavigate();

  const id = searchParams.get('id');
  const mode = searchParams.get('mode');

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 편집 입니다.</p>
      <button onClick={() => setSearchParams({ Hello: 'Men' })}>클릭</button>
      <button
        onClick={() => {
          navigater('/');
        }}
      >
        이동
      </button>
      <button
        onClick={() => {
          navigater(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default Edit;
