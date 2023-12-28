import { useSelector, useDispatch } from "react-redux"
import { changeSearchField } from "../actions/actionCreators"
import { ISkills, SkillsState } from "../reducers/skillsReducer"

export default function Skills() {
  const { items, loading, error, search } = useSelector(
    (state: {skills: SkillsState}) => state.skills
  );
  const dispatch = useDispatch()

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    dispatch(changeSearchField(value));
  }

  // для проверки, что в инпут не ввели пустую строку
  const hasQuery = search.trim() !== ""
  
  return (
    <main>
      <div style={{marginBottom: "10px"}}>
        <input style={{padding: "5px"}}
          type="search" value={search} onChange={handleSearch} />
      </div>

      {/* если ничего не ввели в инпут */}
      {!hasQuery && <div>Type something to search...</div>}

      {/* если идет загрузка с сервера */}
      {hasQuery && loading && <div>searching...</div>}

      {error ? (
        <div>Error occured</div>
      ) : (
        <ul style={{listStyleType: "none", paddingLeft: "0"}}>
          {items.map((o: ISkills) => (
            <li key={o.id}>{o.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
