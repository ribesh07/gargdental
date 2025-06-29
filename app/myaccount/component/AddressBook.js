export function AddressBook({ homeAddress, officeAddress, onEditHome, onEditOffice }) {
    return (
      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">Home Address</h2>
          <button
            onClick={onEditHome}
            className="text-blue-500 text-sm underline font-semibold"
          >
            EDIT
          </button>
        </div>
        <div className="space-y-2 text-gray-700 text-sm">
          <p>
            <span className="font-semibold">Name:</span> {homeAddress.fullName}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {homeAddress.localAddress}, {homeAddress.zone}, {homeAddress.city},{" "}
            {homeAddress.province}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {homeAddress.phone}
          </p>
          <p className="text-gray-500 pt-2">Default Shipping & Billing Address</p>
        </div>
        <br></br>
  
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">Office Address</h2>
          <button
            onClick={onEditOffice}
            className="text-blue-500 text-sm underline font-semibold"
          >
            EDIT
          </button>
        </div>
        <div className="space-y-2 text-gray-700 text-sm">
          <p><span className="font-semibold">Name:</span> {officeAddress.fullName}</p>
          <p><span className="font-semibold">Address:</span> {officeAddress.localAddress}, {officeAddress.zone}, {officeAddress.city}, {officeAddress.province}</p>
          <p><span className="font-semibold">Phone:</span> {officeAddress.phone}</p>
  
        </div>
      </div>
  
    );
  }