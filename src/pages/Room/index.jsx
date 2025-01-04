// import React from 'react'
// import {useParams} from 'react-router-dom'
// import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
// export default function index() {
//     const {roomid} = useParams();
//     const mymeeting =async (e)=>{
//         const appID=1747268010;
//         const serverSecret= "f546fde8176ae0acbaa87f14a0e6f462";
//         const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  Date.now().toString(),"user");
//         const zc=ZegoUIKitPrebuilt.create(kitToken);
// zc.joinRoom({
//     container:e,
//     sharedLinks:[
//         {
//             name:'copy Link',
//             url:`http://localhost:3000/room/${roomid}`
//         }
//     ],
//     scenario:{
//       mode:ZegoUIKitPrebuilt.OneONoneCall,

//     },
//     showScreenSharingButton:false,
// })

//     }
//   return (
//     <div>
//       <div ref={mymeeting}/>
//     </div>
//   )
// }

//  2nd code 
// import React, { useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// export default function Room() {
//     const { roomid } = useParams();
//     const meetingRef = useRef(null);

//     useEffect(() => {
//         const mymeeting = async () => {
//             const appID = 1747268010;
//             const serverSecret = "f546fde8176ae0acbaa87f14a0e6f462";
//             const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid, Date.now().toString(), "user");
//             const zc = ZegoUIKitPrebuilt.create(kitToken);

//             zc.joinRoom({
//                 container: meetingRef.current,
//                 sharedLinks: [
//                     {
//                         name: 'copy Link',
//                         // url: `http://localhost:3000/room/${roomid}`
//                         url: `http://localhost:3000/room/1`
//                     }
//                 ],
//                 scenario: {
//                     mode: ZegoUIKitPrebuilt.OneONoneCall,
//                 },
//                 showScreenSharingButton: false,
//             });
//         };

//         mymeeting();
//     }, [roomid]);

//     return (
//         <div>
//             <div ref={meetingRef} />
//         </div>
//     );
// }



// 3rd code
// import React from 'react'
// // import {useParams} from 'react-router-dom'
// import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
// export default function index() {
//     // const {roomid} = useParams();
//     const mymeeting =async (e)=>{
//         const appID=1747268010;
//         const serverSecret= "f546fde8176ae0acbaa87f14a0e6f462";
//         const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, 1,  Date.now().toString(),"user");
//         const zc=ZegoUIKitPrebuilt.create(kitToken);
// zc.joinRoom({
//     container:e,
//     sharedLinks:[
//         {
//             name:'copy Link',
//             url:`http://localhost:3000/room/1`
//         }
//     ],
//     scenario:{
//       mode:ZegoUIKitPrebuilt.OneONoneCall,

//     },
//     showScreenSharingButton:false,
// })

//     }
//   return (
//     <div>
//       <div ref={mymeeting}/>
//     </div>
//   )
// }



// 4th code

// import React from 'react';

// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// export default function Index() {
//   const myMeeting = async (element) => {
//     const appID = 188889561;
//     const serverSecret = "33c2cb87c4491b1a521afcc3cfc07d63";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, 1, Date.now().toString(), "user");
//     const zc = ZegoUIKitPrebuilt.create(kitToken);
//     zc.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: 'copy Link',
//           url: `http://localhost:3000/room/1`
//         }
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall
//       },
//       showScreenSharingButton: false,
//     });
//   };

//   return (
//     <div>
//       <div ref={myMeeting} />
//     </div>
//   );
// }



// code 5
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

export default function Room() {
    const { roomid } = useParams();
    const meetingRef = useRef(null);

    useEffect(() => {
        const mymeeting = async () => {
            const appID = 1541161195;
            const serverSecret = "fbcb35198ec4ff2b22353a3725bd9a6a";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid, Date.now().toString(), "user");
            const zc = ZegoUIKitPrebuilt.create(kitToken);

            zc.joinRoom({
                container: meetingRef.current,
                sharedLinks: [
                    {
                        name: 'copy Link',
                        url: `http://localhost:3000/room/${roomid}`
                    }
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: false,
            });
        };

        mymeeting();
    }, [roomid]);

    return (
        <div>
            <div ref={meetingRef} />
        </div>
    );
}