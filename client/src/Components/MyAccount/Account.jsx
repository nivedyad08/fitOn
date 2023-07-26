import React, { useState } from 'react';
import EditUserAccount from './EditUserAccount';
import ChangePassword from './ChangePassword';
import Reports from './Reports';
import Subscription from './Subscription';
import Favourites from './Favourites';
import { useSelector } from 'react-redux';
import { USER_ROLE, TRAINER_ROLE } from '../../constants/roles';

const Account = ({ setIsLoading }) => {
  const [activeMenu, setActiveMenu] = useState('edit')
  const user = useSelector((state) => state.loggedUser.userInfo)

  const renderContent = () => {
    switch (activeMenu) {
      case 'edit':
        return (
          <EditUserAccount setIsLoading={ setIsLoading } />
        )
      case 'change password':
        return (
          <ChangePassword />
        )
      case 'favourites':
        return (
          <Favourites />
        )
      case 'subscriptions':
        return (
          <Subscription />
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col sm:flex-row gap-44">
      <div className="w-full sm:w-1/4 custom-blue p-4 rounded-lg">
        <ul className="space-y-24 mx-30 my-20">
          <li>
            <a href="#" onClick={ () => setActiveMenu('edit') } className={ `text-slate-200 font-semibold text-sm ${ activeMenu === 'edit' ? 'text-custom-yellow' : '' }` }>
              Edit
            </a>
          </li>
          <li>
            <a href="#" onClick={ () => setActiveMenu('change password') } className={ `text-slate-200 font-semibold text-sm ${ activeMenu === 'change password' ? 'text-custom-yellow' : '' }` }>
              Change Password
            </a>
          </li>
          { user.role === USER_ROLE ? (
            <li>
              <a href="#" onClick={ () => setActiveMenu('favourites') } className={ `text-slate-200 font-semibold text-sm ${ activeMenu === 'favourites' ? 'text-custom-yellow' : '' }` }>
                Favourites
              </a>
            </li>
          ) : (
            ""
          )
          }
          <li>
            <a href="#" onClick={ () => setActiveMenu('subscriptions') } className={ `text-slate-200 font-semibold text-sm ${ activeMenu === 'subscriptions' ? 'text-custom-yellow' : '' }` }>
              Subscriptions
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 custom-blue rounded-lg shadow p-6">
        <div>{ renderContent() }</div>
      </div>
    </div>
  );
};

export default Account;
