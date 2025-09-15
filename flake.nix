{
  description = "HoprSDK";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};

        mkDevShell = nodejs: pkgs.mkShell {
          nativeBuildInputs = [
            nodejs
            (pkgs.yarn.override { inherit nodejs; })
          ]
          ++ pkgs.lib.optional pkgs.stdenv.isLinux pkgs.inotify-tools;
        };
      in
      {
        devShells = {
          default = mkDevShell pkgs.nodejs_22;
          node22  = mkDevShell pkgs.nodejs_22;
          node24  = mkDevShell pkgs.nodejs_24;
        };
      });
}
