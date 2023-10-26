import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const is_expired=(token)=>{
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        
        return true
        
      } else {
        return false
      }
}