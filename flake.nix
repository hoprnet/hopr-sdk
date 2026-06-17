{
  description = "HoprSDK";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    pre-commit.url = "github:cachix/git-hooks.nix";
    pre-commit.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, pre-commit }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};

        pre-commit-check = pre-commit.lib.${system}.run {
          src = ./.;
          hooks = {
            actionlint.enable = true;
            pinact = {
              enable = true;
              name = "pinact";
              description = "Check GitHub Action refs are SHA-pinned and resolvable";
              entry = "${pkgs.pinact}/bin/pinact run --check";
              files = "\\.ya?ml$";
              language = "system";
              pass_filenames = false;
            };
          };
          tools = pkgs;
        };

        mkDevShell = nodejs: pkgs.mkShell {
          nativeBuildInputs = [
            nodejs
            (pkgs.yarn.override { inherit nodejs; })
          ]
          ++ pkgs.lib.optional pkgs.stdenv.isLinux pkgs.inotify-tools;
          shellHook = ''
            ${pre-commit-check.shellHook}
            export GITHUB_TOKEN="$(gh auth token 2>/dev/null || true)"
          '';
        };
      in
      {
        checks = {
          pre-commit-check = pre-commit-check;
        };

        devShells = {
          default = mkDevShell pkgs.nodejs_22;
          node22  = mkDevShell pkgs.nodejs_22;
          node24  = mkDevShell pkgs.nodejs_24;
        };
      });
}
