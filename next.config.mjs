import MillionLint from "@million/lint";
 
const nextConfig = {
    productionBrowserSourceMaps: true,
};
 
export default MillionLint.next({ rsc: true })(nextConfig);