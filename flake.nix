{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      nixpkgs,
      ags,
      astal,
      ...
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      extraPackages =
        (with ags.packages.${system}; [
          battery
          bluetooth
          network
          mpris
          notifd
          wireplumber
          hyprland
          tray
          apps
          # pkgs.fzf
        ])
        ++ (with pkgs; [
          libgtop
          lm_sensors
        ]);

      mshellPackages = rec {
        mshell = ags.lib.bundle {
          inherit pkgs;
          src = ./.;
          name = "mshell";
          entry = "app.ts";
          gtk4 = false;

          # additional libraries and executables to add to gjs' runtime
          inherit extraPackages;
        };

        mshell-wrapped = pkgs.writeShellScriptBin "mshell" ''
          # Exporting glib-networking modules
          export GIO_EXTRA_MODULES="${pkgs.glib-networking}/lib/gio/modules"
          if [ "$#" -eq 0 ]; then
              exec ${mshell}/bin/mshell
          else
              exec ${ags.packages.${system}.io}/bin/astal -i mshell "$@"
          fi
        '';
      };
    in
    {
      packages.${system} = mshellPackages;

      overlays.default = final: prev: mshellPackages;

      devShells.${system} = {
        default = pkgs.mkShell {
          name = "mshell dev";

          buildInputs = with pkgs; [
            ags.packages.${system}.ags
            astal.packages.${system}.astal3
            astal.packages.${system}.io
            gjs
          ];

          shellHook = ''
            if [ "''${PWD##*/}" = "ags" ]; then

              # Exporting glib-networking modules
              export GIO_EXTRA_MODULES="${pkgs.glib-networking}/lib/gio/modules"

              if ! test -L ./node_modules/astal; then
                echo ""
                echo "💡 Initialising astal... (required for typescript server to work)"

                mkdir -p node_modules;
                ln -sf ${astal.packages.${system}.gjs}/share/astal/gjs ./node_modules/astal

                echo "💡 Done."
                echo ""
              fi

              if ! test -d ./@girs; then
                echo ""
                echo "💡 Generating types..."

                ags types -d .;
                
                echo ""
              fi

            else
              echo "You're not in the ags root directory, initialisation failed"
            fi
          '';
        };
      };
    };
}
