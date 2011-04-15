/*******************************************************************************
#      ____               __          __  _      _____ _       _               #
#     / __ \              \ \        / / | |    / ____| |     | |              #
#    | |  | |_ __   ___ _ __ \  /\  / /__| |__ | |  __| | ___ | |__   ___      #
#    | |  | | '_ \ / _ \ '_ \ \/  \/ / _ \ '_ \| | |_ | |/ _ \| '_ \ / _ \     #
#    | |__| | |_) |  __/ | | \  /\  /  __/ |_) | |__| | | (_) | |_) |  __/     #
#     \____/| .__/ \___|_| |_|\/  \/ \___|_.__/ \_____|_|\___/|_.__/ \___|     #
#           | |                                                                #
#           |_|                 _____ _____  _  __                             #
#                              / ____|  __ \| |/ /                             #
#                             | (___ | |  | | ' /                              #
#                              \___ \| |  | |  <                               #
#                              ____) | |__| | . \                              #
#                             |_____/|_____/|_|\_\                             #
#                                                                              #
#                              (c) 2010-2011 by                                #
#           University of Applied Sciences Northwestern Switzerland            #
#                           martin.christen@fhnw.ch                            #
********************************************************************************

This file is part of the OpenWebGlobe SDK

GPL LICENSE

i3D OpenWebGlobe SDK is free software: you can redistribute it and/or modify  it
under the  terms of  the GNU  General Public  License as  published by  the Free
Software Foundation, either version  2 of the License,  or (at your option)  any
later version.

i3D OpenWebGlobe  SDK is  distributed in  the hope  that it  will be useful, but
WITHOUT ANY WARRANTY;  without even the  implied warranty of  MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See  the GNU General Public License for  more
details.

You should have received a copy of the GNU General Public License along with i3D
OpenWebGlobe SDK.  If not, see <http://www.gnu.org/licenses/>.

As a special  exception to the  GPL, any HTML  file which merely  makes function
calls to  this code,  and for  that purpose  includes it  by reference, shall be
deemed a separate work for copyright law purposes. If you modify this code,  you
may extend this exception to your version of the code, but you are not obligated
to do so. If you do not wish to do so, delete this exception statement from your
version.

Commercial License

OEMs (Original  Equipment Manufacturers),  ISVs (Independent  Software Vendors),
VARs (Value Added Resellers) and other distributors that combine and  distribute
commercially licensed  software with  i3D OpenWebGlobe  SDK and  do not  wish to
distribute the source code for the commercially licensed software under  version
2 of the  GNU General Public  License (the "GPL")  must enter into  a commercial
license agreement with the Institute of Geomatics Engineering at the  University
of Applied Sciences Northwestern Switzerland (FHNW).
*******************************************************************************/

//------------------------------------------------------------------------------
/** 
 * @description ViewFrustum: Class for test if a Box is inside or outside the view frustum. 
 * @constructor
 * @param mvpMatrix the model-view-projection matrix
 */
function ViewFrustum(mvpMatrix)
{
   this.matMVP = mvpMatrix;
   this.frustumPlanes = new Array(6);
   
   this.frustumPlanes[0] = new plane3();
   this.frustumPlanes[1] = new plane3();
   this.frustumPlanes[2] = new plane3();
   this.frustumPlanes[3] = new plane3();
   this.frustumPlanes[4] = new plane3();
   this.frustumPlanes[5] = new plane3();
   
   this.mvp = mvpMatrix;
   this.mvpVals = mvpMatrix.Get();
   
   this.mvpval_11 = this.mvpVals[0]; 
   this.mvpval_12 = this.mvpVals[1];
   this.mvpval_13 = this.mvpVals[2];
   this.mvpval_14 = this.mvpVals[3];
   this.mvpval_21 = this.mvpVals[4];
   this.mvpval_22 = this.mvpVals[5];
   this.mvpval_23 = this.mvpVals[6];
   this.mvpval_24 = this.mvpVals[7];
   this.mvpval_31 = this.mvpVals[8];
   this.mvpval_32 = this.mvpVals[9];
   this.mvpval_33 = this.mvpVals[10];
   this.mvpval_34 = this.mvpVals[11];
   this.mvpval_41 = this.mvpVals[12];
   this.mvpval_42 = this.mvpVals[13];
   this.mvpval_43 = this.mvpVals[14];
   this.mvpval_44 = this.mvpVals[15];
   
   
   this.UpdateFrustumPlanes();
   
   
}

/** 
 * @description Struct to save plane data.
 * @ignore
 */
function plane3(){
   this.D = 0;
   this.nx = 0;
   this.ny = 0;
   this.nz = 0;
}

/** 
 * @description Struct to save corner coordinates
 * @ignore
 */
function corner(){
   this.x = 0;
   this.y = 0;
   this.z = 0;
}


//------------------------------------------------------------------------------
/** 
 * @description ViewFrustum: function to test if a Box (defined by min_x,min_y,min_z and max_x,max_y,max_z) is inside or outside the view frustum. 
 * @param min_x   min_x x coordinate of front-left-bottom box corner. 
 * @param min_y   min_y y coordinate of front-left-bottom box corner. 
 * @param min_z   min_z z coordinate of front-left-bottom box corner. 
 * @param max_x   max_x x coordinate of rear-right-top box corner. 
 * @param max_y   max_y y coordinate of rear-right-top box corner. 
 * @param max_z   max_z z coordinate of rear-right-top box corner. 
 */
ViewFrustum.prototype.TestBox = function(min_x, min_y, min_z, max_x, max_y, max_z)
{
  
  var nTotalIn = 0;
  
  var corners = new Array(8);
  
  corners[0] = new corner();
  corners[0].x = min_x; corners[0].y = min_y; corners[0].z = min_z;
  corners[1] = new corner();
  corners[1].x = max_x; corners[1].y = min_y; corners[1].z = min_z;
  corners[2] = new corner();
  corners[2].x = max_x; corners[2].y = max_y; corners[2].z = min_z;
  corners[3] = new corner();
  corners[3].x = min_x; corners[3].y = max_y; corners[3].z = min_z;
  corners[4] = new corner();
  corners[4].x = min_x; corners[4].y = min_y; corners[4].z = max_z;
  corners[5] = new corner();
  corners[5].x = min_x; corners[5].y = max_y; corners[5].z = max_z;
  corners[6] = new corner();
  corners[6].x = max_x; corners[6].y = max_y; corners[6].z = max_z;
  corners[7] = new corner();
  corners[7].x = max_x; corners[7].y = min_y; corners[7].z = max_z;
  
  for(var i=0; i<6; i++)
  {    
     var inCount = 8;
     for(var j=0; j<8; j++)
     {  
        //test for every point and plane combination
        //dot(corner,plane_normal)+plane.d
        var sign = ((this.frustumPlanes[i].nx * corners[j].x + this.frustumPlanes[i].ny * corners[j].y + this.frustumPlanes[i].nz * corners[j].z) + this.frustumPlanes[i].D);
        if( sign < 0)
        {
           --inCount;
        }
     }   
     if(inCount == 0)
     {
        //corner outside frustum
        return false;
     } 
  }
  return true;    
}


//------------------------------------------------------------------------------
/** 
 * @description Extracts the frustum planes from mvpMatrix.
 */
ViewFrustum.prototype.UpdateFrustumPlanes = function()
{
  
   //Left clipping plane
   this.frustumPlanes[0].nx = this.mvpval_41 + this.mvpval_11; 
   this.frustumPlanes[0].ny = this.mvpval_42 + this.mvpval_12;
   this.frustumPlanes[0].nz = this.mvpval_43 + this.mvpval_13;
   this.frustumPlanes[0].D  = this.mvpval_44 + this.mvpval_14;
   
   //Right clipping plane
   this.frustumPlanes[1].nx = this.mvpval_41 - this.mvpval_11; 
   this.frustumPlanes[1].ny = this.mvpval_42 - this.mvpval_12;
   this.frustumPlanes[1].nz = this.mvpval_43 - this.mvpval_13;
   this.frustumPlanes[1].D  = this.mvpval_44 - this.mvpval_14;
   
   
   //Top clipping Plane
   this.frustumPlanes[2].nx = this.mvpval_41 - this.mvpval_21; 
   this.frustumPlanes[2].ny = this.mvpval_42 - this.mvpval_22;
   this.frustumPlanes[2].nz = this.mvpval_43 - this.mvpval_23;
   this.frustumPlanes[2].D  = this.mvpval_44 - this.mvpval_24;
   
   //Bottom
   this.frustumPlanes[3].nx = this.mvpval_41 + this.mvpval_21; 
   this.frustumPlanes[3].ny = this.mvpval_42 + this.mvpval_22;
   this.frustumPlanes[3].nz = this.mvpval_43 + this.mvpval_23;
   this.frustumPlanes[3].D  = this.mvpval_44 + this.mvpval_24;
   
   //near
   this.frustumPlanes[4].nx = this.mvpval_41 + this.mvpval_31; 
   this.frustumPlanes[4].ny = this.mvpval_42 + this.mvpval_32;
   this.frustumPlanes[4].nz = this.mvpval_43 + this.mvpval_33;
   this.frustumPlanes[4].D  = this.mvpval_44 + this.mvpval_34;
   
   //far
   this.frustumPlanes[5].nx = this.mvpval_41 - this.mvpval_31; 
   this.frustumPlanes[5].ny = this.mvpval_42 - this.mvpval_32;
   this.frustumPlanes[5].nz = this.mvpval_43 - this.mvpval_33;
   this.frustumPlanes[5].D  = this.mvpval_44 - this.mvpval_34;
   
   
}
