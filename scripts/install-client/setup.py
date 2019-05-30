from cx_Freeze import setup, Executable

# Dependencies are automatically detected, but it might need
# fine tuning.
buildOptions = dict(packages = [], excludes = [])

base = 'Console'

executables = [
    Executable('ft-update.py', base=base)
]

setup(name='ft-update',
      version = '1.0',
      description = 'FieldTrainer update client',
      options = dict(build_exe = buildOptions),
      executables = executables)
