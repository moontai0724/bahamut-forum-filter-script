export {};

declare global {
  type DeviceType = "desktop" | "mobile";
  type PageType = DesktopPageType | MobilePageType;
  type DesktopPageType =
    | "/B.php"
    | "/Bo.php"
    | "/C.php"
    | "/Co.php"
    | "/search.php";
  type MobilePageType = "/forum/B.php" | "/forum/C.php" | "/forum/Co.php";
}
