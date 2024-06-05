import React from "react";
import ROUTES from "./Routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.empMan.name} element={ROUTES.empMan.component} />
          <Route path={ROUTES.about.name} element={ROUTES.about.component} />
          <Route path={ROUTES.adminHome.name} element={ROUTES.adminHome.component}/>
          <Route path={ROUTES.home.name} element={ROUTES.home.component} />
          <Route path={ROUTES.contact.name} element={ROUTES.contact.component}/>
          <Route path={ROUTES.support.name} element={ROUTES.support.component}/>
          <Route path={ROUTES.register.name} element={ROUTES.register.component}/>
          <Route path={ROUTES.cliMan.name} element={ROUTES.cliMan.component}/>
          <Route path={ROUTES.cliHistory.name} element={ROUTES.cliHistory.component}/>
          <Route path={ROUTES.bookingHistory.name} element={ROUTES.bookingHistory.component}/>
          <Route path={ROUTES.allusers.name} element={ROUTES.allusers.component}/>
          <Route path={ROUTES.empHistory.name} element={ROUTES.empHistory.component}/>
          <Route path={ROUTES.login3.name} element={ROUTES.login3.component}/>
          <Route path={ROUTES.register1.name} element={ROUTES.register1.component}/>
          <Route path={ROUTES.contact1.name} element={ROUTES.contact1.component}/>
          <Route path={ROUTES.regPet.name} element={ROUTES.regPet.component}/>
          <Route path={ROUTES.clientHome.name} element={ROUTES.clientHome.component}/>
          <Route path={ROUTES.clientPets.name} element={ROUTES.clientPets.component}/>
          <Route path={ROUTES.petHistory.name} element={ROUTES.petHistory.component}/>
          <Route path={ROUTES.clientBooking.name} element={ROUTES.clientBooking.component}/>
          <Route path={ROUTES.adminManagement.name} element={ROUTES.adminManagement.component}/>
          <Route path={ROUTES.clientMyBooking1.name} element={ROUTES.clientMyBooking1.component}/>
          <Route path={ROUTES.empHome.name} element={ROUTES.empHome.component}/>
          <Route path={ROUTES.myEmpBooking.name} element={ROUTES.myEmpBooking.component}/>
          <Route path={ROUTES.navigate.name} element={ROUTES.navigate.component}/>
          <Route path={ROUTES.startWalk.name} element={ROUTES.startWalk.component}/>
          <Route path={ROUTES.adminProfile.name} element={ROUTES.adminProfile.component}/>
          <Route path={ROUTES.adminChangePassword.name} element={ROUTES.adminChangePassword.component}/>
          <Route path={ROUTES.registerPage2.name} element={ROUTES.registerPage2.component}/>
          <Route path={ROUTES.login4.name} element={ROUTES.login4.component}/>
          <Route path={ROUTES.myBookingEmp.name} element={ROUTES.myBookingEmp.component}/>
          <Route path={ROUTES.managProfEmp.name} element={ROUTES.managProfEmp.component}/>
          <Route path={ROUTES.contactAdmin.name} element={ROUTES.contactAdmin.component}/>
          <Route path={ROUTES.bookingHistoryAdmin.name} element={ROUTES.bookingHistoryAdmin.component}/>
          <Route path={ROUTES.contactAdminReply.name} element={ROUTES.contactAdminReply.component}/>
          <Route path={ROUTES.employeeWalkDetail.name} element={ROUTES.employeeWalkDetail.component}/>
          <Route path={ROUTES.clientWalkDetails.name} element={ROUTES.clientWalkDetails.component}/>
          <Route path={ROUTES.viewUserDetailAdmin.name} element={ROUTES.viewUserDetailAdmin.component}/>
          <Route path={ROUTES.NotAuthorized.name} element={ROUTES.NotAuthorized.component}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navigation;
