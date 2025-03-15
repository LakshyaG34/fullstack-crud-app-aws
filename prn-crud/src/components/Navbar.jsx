export const Navbar = ({onOpen, onSearch}) => {
  const handleSearch = (e) =>
  {
    onSearch(e.target.value);
  }
  return (
    <>
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Client</a>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <input type="text" placeholder="search" className="input input-bordered" onChange = {handleSearch}/>
        </div>
      </div>
      <div className = "navbar-end"><a className="btn btn-primary" onClick ={onOpen}>Add Client</a></div>

    </div>
    </>
  );
};
