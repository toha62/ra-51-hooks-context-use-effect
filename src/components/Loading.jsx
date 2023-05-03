export default function Loading() {
  return (
    <>      
      <div className="modal show fade" id="exampleModal" style={{display: "block"}} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">            
            <h5 className="modal-body">
              Loading...
            </h5>            
          </div>
        </div>
      </div>
    </>    
  );
}