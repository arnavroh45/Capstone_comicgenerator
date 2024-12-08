"""
This module provides all the functions related to JWT.
"""
# pylint: disable=too-many-locals
# pylint: disable=missing-function-docstring
# pylint: disable=no-name-in-module
# pylint: disable=import-error
# pylint: disable=line-too-long
# pylint: disable=raise-missing-from

import jwt
import datetime
import os
from fastapi import HTTPException, Depends, status, Request
from fastapi.security import OAuth2PasswordBearer, APIKeyHeader
from starlette.status import HTTP_401_UNAUTHORIZED
from dotenv import load_dotenv
from config import SECRET_KEY, users

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
api_key_scheme = APIKeyHeader(name="Authorization", auto_error=False)


def get_token(request: Request):
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Missing Authorization header",
                )
            try:
                # Extract the token by removing the "Bearer" prefix
                token = auth_header.split(" ")[1]
                return token
            except IndexError:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid Authorization header format",
                )
            # email = payload['user'].get("email")
            email = payload.get("email")
            print(payload)
            if email is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            user = users.find_one({"email": email})
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return user
        except jwt.PyJWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

def verify_token(token: str = Depends(get_token)):
    try:
        # Decode the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        print(payload)
        email = payload.get("email")
        # email = payload['user'].get("email")
        if email is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        user = users.find_one({"email": email})
        if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token {str(e)}")
